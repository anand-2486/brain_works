from fastapi import FastAPI, File, UploadFile, Response, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from datetime import datetime
from ml_model import predict_tumor

# 1. Initialize the App
app = FastAPI()

# 2. Security Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. In-memory storage for the latest report
last_report_bytes = None

# 🟢 ROBUST PATH SETUP: Get the absolute path of the 'backend' folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.get("/")
def home():
    return {"message": "NeuroScan AI Server is Online"}

# --- THE PREDICTION ENDPOINT ---
@app.post("/predict")
async def predict_endpoint(
    file: UploadFile = File(...), 
    # Catch ALL patient details for the Professional Report
    firstName: str = Form(...),
    lastName: str = Form(...),
    age: str = Form(...),
    gender: str = Form(...),
    phone: str = Form(...),
    email: str = Form(...),
    symptoms: str = Form(...) 
):
    global last_report_bytes
    
    # 🟢 SAVE SAFELY: Save the image directly in the 'backend' folder
    # This prevents "File Not Found" errors if you run the terminal from elsewhere
    file_path = os.path.join(BASE_DIR, file.filename)
    
    try:
        # A. Save the MRI scan temporarily
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # B. Bundle the data into a clean dictionary
        patient_data = {
            "name": f"{firstName} {lastName}",
            "age": age,
            "gender": gender,
            "phone": phone,
            "email": email,
            "symptoms": symptoms,
            "date": datetime.now().strftime("%Y-%m-%d")
        }
        
        # C. Run AI logic
        # We pass the absolute 'file_path' so ml_model.py can definitely find it
        prediction = predict_tumor(file_path, patient_data)
        
        # D. Extract and store the PDF bytes
        if "pdf_bytes" in prediction:
            last_report_bytes = bytes.fromhex(prediction.pop("pdf_bytes"))
        
        return prediction

    except Exception as e:
        print(f"CRITICAL SERVER ERROR: {e}")
        return {"result": "Error", "error": str(e)}
        
    finally:
        # Cleanup: Delete the MRI image immediately after analysis
        if os.path.exists(file_path):
            os.remove(file_path)

# --- THE PDF DOWNLOAD ENDPOINT ---
@app.get("/download_report")
def download_report():
    global last_report_bytes
    
    if last_report_bytes:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        download_name = f"NeuroScan_Report_{timestamp}.pdf"

        return Response(
            content=last_report_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f'attachment; filename="{download_name}"'
            }
        )
    else:
        raise HTTPException(status_code=404, detail="No report found. Please run a scan first.")
# --- RUN THE APP ---
if __name__ == "__main__":
    import uvicorn
    import os
    # Get port from environment variable, default to 8080
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)