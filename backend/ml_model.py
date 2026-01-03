import numpy as np
from PIL import Image
import os
import cv2
import io
import tensorflow as tf
from datetime import datetime
from google import genai 
import gdown  # 🟢 NEW: Library to download from Drive

# --- PDF GENERATION LIBRARIES ---
from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib import colors
from reportlab.platypus import Paragraph, Frame
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT

# --- 1. SETUP VERTEX AI ---
PROJECT_ID = "project-e40e528f-75be-46e0-bcb"
LOCATION = "us-central1"
os.environ["GOOGLE_CLOUD_PROJECT"] = PROJECT_ID
try:
    client = genai.Client(vertexai=True, project=PROJECT_ID, location=LOCATION)
    print(f"✅ SUCCESS: Connected to Vertex AI ({PROJECT_ID})")
except Exception as e:
    print(f"❌ AUTH ERROR: Vertex AI Connection Failed. {e}")

# --- 2. SETUP LOCAL MODEL (Auto-Download Logic) ---
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
model = None

# Robust Path: Finds model.h5 in the backend folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.h5")

# 🟢 NEW: Check and Download if Missing
if not os.path.exists(MODEL_PATH):
    print(f"⚠️ Model not found at {MODEL_PATH}")
    print("⬇️ Downloading from Google Drive (Public Link)...")
    
    try:
        # Example Link: https://drive.google.com/file/d/1xYz.../view
        # The ID is the part between /d/ and /view
        file_id = '1Z5xHY1KILgXEYTJv1UEhKIWjTiobuJuS'
        url = f'https://drive.google.com/uc?id={file_id}'
        
        gdown.download(url, MODEL_PATH, quiet=False)
        print("\n✅ Download Complete!")
    except Exception as e:
        print(f"❌ DOWNLOAD FAILED: {e}")

# Load the model
try:
    if os.path.exists(MODEL_PATH):
        model = tf.keras.models.load_model(MODEL_PATH)
        print(f"✅ SUCCESS: Model Loaded from {MODEL_PATH}")
    else:
        print(f"❌ ERROR: Model still missing after download attempt.")
except Exception as e:
    print(f"❌ CRITICAL ERROR: TensorFlow failed to load. Details: {e}")

# --- 3. PREDICTION & GRAD-CAM (Standard Logic) ---
def final_fix_predict_v4(img_path, model):
    if not os.path.exists(img_path):
        return None, None, "File Not Found", 0, None

    try:
        mapping = {0: 'glioma', 1: 'meningioma', 2: 'notumor', 3: 'pituitary'}
        img_size = 128

        img = tf.keras.preprocessing.image.load_img(img_path, target_size=(img_size, img_size))
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_scaled = img_array / 255.0 
        img_expanded = np.expand_dims(img_scaled, axis=0)

        preds = model.predict(img_expanded, verbose=0)
        class_idx = np.argmax(preds[0])
        confidence = np.max(preds[0]) * 100
        label_name = mapping[class_idx]

        input_img = img_array.astype(np.uint8).copy()
        output_img = img_array.astype(np.uint8).copy()
        heatmap_255 = np.zeros((img_size, img_size), dtype=np.uint8)

        # Grad-CAM only if tumor detected
        if class_idx != 2: 
            try:
                vgg_base = model.get_layer('vgg16') 
                last_conv = vgg_base.get_layer("block5_conv3")
                grad_model = tf.keras.models.Model([vgg_base.input], [last_conv.output, vgg_base.output])
                
                img_tensor = tf.Variable(tf.cast(img_expanded, tf.float32))
                with tf.GradientTape() as tape:
                    tape.watch(img_tensor)
                    conv_out, vgg_preds = grad_model(img_tensor)
                    loss = vgg_preds[:, class_idx]
                
                grads = tape.gradient(loss, conv_out)[0]
                weights = tf.reduce_mean(grads, axis=(0, 1))
                cam = conv_out[0] @ weights[..., tf.newaxis]
                cam = tf.squeeze(tf.maximum(cam, 0) / (tf.math.reduce_max(cam) + 1e-10)).numpy()
                
                heatmap_255 = np.uint8(255 * cv2.resize(cam, (img_size, img_size)))
                _, thresh = cv2.threshold(heatmap_255, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
                contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                
                if contours:
                    best_cnt = max(contours, key=cv2.contourArea)
                    cv2.drawContours(output_img, [best_cnt], -1, (255, 0, 0), 2)
            except Exception as e:
                pass

        return input_img, output_img, label_name, confidence, heatmap_255

    except Exception as e:
        print(f"Error in prediction function: {e}")
        return None, None, "ERROR", 0, None

# --- 4. PROFESSIONAL GEMINI RADIOLOGIST ---
def generate_gemini_report(tumor_type, confidence, patient_data):
    try:
        prompt = f"""
        You are a Senior Neuroradiologist at BrainWorks Medical Healthcare. 
        Write a professional MRI Brain Report for a patient.
        
        **PATIENT DATA:**
        - Name: {patient_data.get('name', 'Unknown')}
        - Age: {patient_data.get('age', 'Unknown')}
        - Clinical Indication/Symptoms: "{patient_data.get('symptoms', 'None provided')}"
        
        **AI DIAGNOSTIC FINDINGS:**
        - Detected Class: {tumor_type}
        - AI Confidence: {confidence}
        
        **REQUIRED OUTPUT FORMAT (Markdown):**
        Write the report in a strict, formal medical tone. Do NOT use greetings. 
        
        **1. CLINICAL HISTORY:** [Summarize the symptoms and age context in 1-2 professional sentences].
        
        **2. TECHNIQUE:** Multi-planar MRI of the brain was performed using standard AI-assisted protocols (T1, T2, FLAIR sequences).
        
        **3. FINDINGS:**
        [Write a detailed paragraph. If a tumor is detected, describe a mass lesion consistent with {tumor_type}. If Healthy, describe normal brain parenchyma, ventricles, and sulci. Mention the AI's confidence level of {confidence} as a supporting metric.]
        
        **4. IMPRESSION:**
        [1-2 bullet points summarizing the primary diagnosis. Be decisive.]
        
        **5. RECOMMENDATIONS:**
        [Provide standard medical advice based on the finding (e.g., Urgent Neurosurgery consult, Follow-up MRI in 6 months, or Clinical correlation).]
        """
        
        response = client.models.generate_content(
            model="gemini-2.5-pro",
            contents=prompt
        )
        return response.text
    except Exception as e:
        print(f"❌ GEMINI ERROR: {e}") 
        return "Report generation unavailable."

# --- 5. PROFESSIONAL PDF GENERATOR ---
def create_pdf_in_memory(gemini_text, patient_data, img_orig, img_heat, img_cont):
    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=LETTER)
    width, height = LETTER
    
    # --- A. HEADER ---
    c.setStrokeColor(colors.darkblue)
    c.setLineWidth(3)
    c.line(30, height - 40, width - 30, height - 40)
    
    c.setFillColor(colors.darkblue)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(30, height - 30, "BrainWorks Medical Healthcare")
    c.setFont("Helvetica", 10)
    c.drawString(width - 200, height - 30, "Department of Neuroradiology")
    
    # --- B. PATIENT DEMOGRAPHICS BOX ---
    box_height = 100
    box_y = height - 150
    
    c.setStrokeColor(colors.black)
    c.setLineWidth(1)
    c.setFillColor(colors.white)
    c.rect(30, box_y, width - 60, box_height, fill=0) 
    
    c.setFillColor(colors.black)
    c.setFont("Helvetica-Bold", 10)
    
    # Labels
    c.drawString(40, box_y + 80, "Patient Name:")
    c.drawString(40, box_y + 60, "Age / Gender:")
    c.drawString(40, box_y + 40, "Contact Phone:")
    c.drawString(40, box_y + 20, "Contact Email:")
    
    c.drawString(300, box_y + 80, "Patient ID:")
    c.drawString(300, box_y + 60, "Exam Date:")
    c.drawString(300, box_y + 40, "Ref. Physician:")
    c.drawString(300, box_y + 20, "Modality:")
    
    # Values
    c.setFont("Helvetica", 10)
    c.drawString(130, box_y + 80, patient_data.get('name', 'N/A'))
    c.drawString(130, box_y + 60, f"{patient_data.get('age', 'N/A')} Years / Unknown")
    c.drawString(130, box_y + 40, patient_data.get('phone', 'N/A'))
    c.drawString(130, box_y + 20, patient_data.get('email', 'N/A'))
    
    c.drawString(390, box_y + 80, f"BW-{datetime.now().strftime('%m%d%H')}")
    c.drawString(390, box_y + 60, patient_data.get('date', datetime.now().strftime("%Y-%m-%d")))
    c.drawString(390, box_y + 40, "Dr. NeuroScan AI")
    c.drawString(390, box_y + 20, "MRI Brain w/ AI Analysis")

    # --- C. REPORT BODY ---
    style_sheet = getSampleStyleSheet()
    style = style_sheet["Normal"]
    style.fontSize = 11
    style.leading = 14
    style.alignment = TA_LEFT
    
    clean_text = gemini_text.replace("**", "").replace("#", "")
    formatted_text = clean_text.replace("\n", "<br/>")
    p = Paragraph(formatted_text, style)
    text_frame = Frame(30, 240, width - 60, 390, showBoundary=0)
    text_frame.addFromList([p], c)

    # --- D. IMAGES ---
    y_pos = 90
    img_width, img_height = 130, 130
    
    def pil_to_reader(pil_img):
        img_byte_arr = io.BytesIO()
        pil_img.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)
        return ImageReader(img_byte_arr)

    c.drawImage(pil_to_reader(img_orig), 40, y_pos, width=img_width, height=img_height)
    c.drawImage(pil_to_reader(img_heat), 240, y_pos, width=img_width, height=img_height)
    c.drawImage(pil_to_reader(img_cont), 440, y_pos, width=img_width, height=img_height)

    c.setFont("Helvetica-Bold", 9)
    c.drawCentredString(105, y_pos - 15, "Sequence: T2 FLAIR")
    c.drawCentredString(305, y_pos - 15, "AI Attention Map")
    c.drawCentredString(505, y_pos - 15, "Tumor Segmentation")

    c.setStrokeColor(colors.lightgrey)
    c.line(30, 40, width - 30, 40)
    c.setFont("Helvetica-Oblique", 8)
    c.setFillColor(colors.darkgrey)
    c.drawString(30, 25, "Electronically Signed by: NeuroScan AI System V1.0")
    c.drawString(width - 250, 25, "This report is assistive and not a final diagnosis.")

    c.save()
    pdf_data = buffer.getvalue()
    buffer.close()
    return pdf_data

# --- 6. MAIN ORCHESTRATOR ---
def predict_tumor(image_path, patient_data):
    if model is None:
        return {"result": "System Error", "report": "Model not loaded."}

    try:
        in_img, out_img, label, conf_val, hmap = final_fix_predict_v4(image_path, model)

        if in_img is None:
            return {"result": "Error", "error": "Processing failed"}

        display_result = "No Tumor Detected" if label == 'notumor' else "Tumor Detected"
        tumor_type = "Healthy" if label == 'notumor' else label.capitalize()
        conf_str = f"{round(conf_val, 2)}%"

        detailed_report = generate_gemini_report(
            tumor_type=tumor_type, 
            confidence=conf_str, 
            patient_data=patient_data
        )

        pil_orig = Image.fromarray(in_img)
        hmap_color = cv2.applyColorMap(hmap, cv2.COLORMAP_JET)
        hmap_rgb = cv2.cvtColor(hmap_color, cv2.COLOR_BGR2RGB) 
        pil_heat = Image.fromarray(hmap_rgb)
        pil_cont = Image.fromarray(out_img)

        pdf_bytes = create_pdf_in_memory(detailed_report, patient_data, pil_orig, pil_heat, pil_cont)
        
        return {
            "result": display_result,
            "type": tumor_type,
            "confidence": conf_str, 
            "report": detailed_report, 
            "pdf_bytes": pdf_bytes.hex(),
            "raw_score": str(conf_val)
        }

    except Exception as e:
        print(f"Main Error: {e}")
        return {"result": "Error", "error": str(e)}