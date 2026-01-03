// import React, { useState, useEffect } from 'react';
// //import './style.css';

// export default function BrainWorksApp() {
//   const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'services'
//   const [formData, setFormData] = useState({ firstName: '', lastName: '', age: '', phone: '', email: '', symptoms: '' });
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Scroll to top when switching pages
//   useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     // Simulate Gemini API Call
//     setTimeout(() => {
//       const isPositive = Math.random() > 0.5; // Simulated result logic
//       setAnalysisResult({
//         detected: isPositive,
//         confidence: (Math.random() * (99 - 85) + 85).toFixed(2), // Random confidence between 85-99%
//         message: isPositive ? "Brain Tumor Detected" : "No Abnormalities Detected"
//       });
//       setLoading(false);
//     }, 2000);
//   };

//   const downloadPDF = () => {
//     window.print(); // Simplest way to "generate" a report as PDF
//   };

//   return (
//     <div className="app-wrapper">
//       {/* 1. PERSISTENT NAVBAR */}
//       <nav className="navbar-container">
//         <div className="top-bar">
//           <span>📍 123 Arling, Niyola, NY</span>
//           <span>📞 +0 123 456 7890 &nbsp; <button className="login-btn">Log In</button></span>
//         </div>
//         <div className="main-nav">
//           <div className="logo" onClick={() => setCurrentPage('home')} style={{cursor:'pointer'}}>
//             <strong>BrainWorks</strong>
//           </div>
//           <div className="nav-links">
//             <span onClick={() => setCurrentPage('home')}>Home</span>
//             <span onClick={() => setCurrentPage('services')}>Services</span>
//             <span>About</span>
//             <span>Contact</span>
//           </div>
//           <button className="book-btn">Book Now</button>
//         </div>
//       </nav>

//       {/* 2. CONDITIONAL CONTENT */}
//       {currentPage === 'home' ? (
//         <header className="hero-section">
//           <div className="hero-content">
//             <span className="badge">Live Your Life</span>
//             <h1>We Care About Your Health</h1>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
//             <button className="btn-primary">Contact Us</button>
//           </div>
//           <div className="hero-image">
//             <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500" alt="Doctor" />
//           </div>
//         </header>
//       ) : (
//         <div className="services-view">
//           <h2>Patient Information</h2>
//           <form className="form-card" onSubmit={handleSubmit}>
//             <div className="grid-2">
//               <input name="firstName" placeholder="First name" onChange={handleInputChange} required />
//               <input name="lastName" placeholder="Last name" onChange={handleInputChange} required />
//             </div>
//             <div className="grid-2">
//               <input name="age" placeholder="Enter your age" type="number" onChange={handleInputChange} required />
//               <input name="phone" placeholder="Enter phone number" onChange={handleInputChange} required />
//             </div>
//             <input name="email" placeholder="Enter your email" type="email" style={{marginBottom: '20px'}} onChange={handleInputChange} required />
//             <textarea name="symptoms" placeholder="Enter your symptoms" rows="4" onChange={handleInputChange}></textarea>
            
//             <div className="upload-box">
//               <p>Upload your MRI report</p>
//               <input type="file" accept="image/*" />
//             </div>
            
//             <button type="submit" className="btn-primary" disabled={loading}>
//               {loading ? "Analyzing..." : "Submit"}
//             </button>
//           </form>

//           {analysisResult && (
//             <div className="result-section">
//               <h3>Want detailed information on your Result?</h3>
//               <div className="result-text" style={{ color: analysisResult.detected ? 'red' : 'green' }}>
//                 Status: {analysisResult.message}
//               </div>
//               <p>Confidence Level: {analysisResult.confidence}%</p>
//               <div className="btn-group">
//                 <button className="btn-primary">Preview Result</button>
//                 <button className="btn-primary" onClick={downloadPDF}>Download PDF</button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* 3. PERSISTENT FOOTER */}
//       <section className="subscribe-bar">
//         <h2>Subscribe Us To Get More Updates</h2>
//         <div className="sub-input">
//           <input type="email" placeholder="Your Email Address" />
//           <button>SUBSCRIBE</button>
//         </div>
//       </section>

//       <footer className="footer-main">
//         <div className="footer-col">
//           <h3>BrainWorks</h3>
//           <p>123 Arling, Niyola, NY</p>
//           <p>info@yourinfo.com</p>
//         </div>
//         <div className="footer-col">
//           <h4>Quick Links</h4>
//           <ul>
//             <li onClick={() => setCurrentPage('home')}>Home</li>
//             <li onClick={() => setCurrentPage('services')}>Services</li>
//             <li>Blog</li>
//             <li>Contact</li>
//           </ul>
//         </div>
//       </footer>
//     </div>
//   );
// }























// import React, { useState } from 'react';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Subscribe from './Subscribe.jsx';
// import PsycologyIcon from '@mui/icons-material/Psychology';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PhoneIcon from '@mui/icons-material/Phone';
// import SearchIcon from '@mui/icons-material/Search';


// function BrainWorksApp() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     age: '',
//     phone: '',
//     email: '',
//     symptoms: '',
//     hasMRI: false,
//     mriFile: null
//   });

//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [showDetection, setShowDetection] = useState(false);
// const [isLoggedIn, setIsLoggedIn] = useState(false);

// const handleDetectionClick = () => {
//   if (!isLoggedIn) {
//     alert('Please login first');
//     return;
//   }
//   setShowDetection(true);
// };

// const onLoginClick = () => {
//   setIsLoggedIn(true);
// };

// const scrollToSection = (id) => {
//   const el = document.getElementById(id);
//   if (el) el.scrollIntoView({ behavior: 'smooth' });
// };


//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, mriFile: file }));
//     }
//   };

//   const simulateAnalysis = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const random = Math.random();
//         const detected = random > 0.5;
//         const confidence = (Math.random() * 20 + 80).toFixed(2);

//         resolve({
//           status: detected ? 'Tumor Detected' : 'Normal',
//           confidence: `${confidence}%`,
//           detected: detected
//         });
//       }, 3000);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     if (formData.hasMRI && !formData.mriFile) {
//       alert('Please upload your MRI report');
//       return;
//     }

//     setIsAnalyzing(true);
//     setShowResults(false);

//     const result = await simulateAnalysis();

//     setAnalysisResult(result);
//     setIsAnalyzing(false);
//     setShowResults(true);
//   };

//   const handleDownloadPDF = () => {
//     const pdfContent = `
//       BRAINWORKS MEDICAL ANALYSIS REPORT
//       ====================================

//       Patient Information:
//       Name: ${formData.firstName} ${formData.lastName}
//       Age: ${formData.age}
//       Phone: ${formData.phone}
//       Email: ${formData.email}

//       Symptoms: ${formData.symptoms}

//       Analysis Results:
//       Status: ${analysisResult.status}
//       Confidence: ${analysisResult.confidence}

//       Date: ${new Date().toLocaleDateString()}

//       ====================================
//       This is a simulated report for demonstration purposes.
//     `;

//     const blob = new Blob([pdfContent], { type: 'text/plain' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `BrainWorks_Report_${formData.firstName}_${formData.lastName}.txt`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
//   };

//   const handlePreviewResult = () => {
//     alert(`
//       Analysis Result Preview:

//       Status: ${analysisResult.status}
//       Confidence: ${analysisResult.confidence}

//       Patient: ${formData.firstName} ${formData.lastName}
//       Date: ${new Date().toLocaleDateString()}
//     `);
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div>
//          <header className="header">
//       <div className="header-left">
//         <div className="logo" onClick={scrollToTop}>
//           <PsychologyIcon className="psycology-icon" style={{fontSize : 40}}/>Brain<span>Works</span>
//         </div>
//         <hr></hr>
         
//         <nav>
//           <ul className="nav-links">
//             <li>
//               <a onClick={scrollToTop}>Home</a>
//             </li>
//             <li>
              
//               <a onClick={handleDetectionClick}>Services</a>
//             </li>
//             <li>
//               <a href="#">About</a>
//             </li>
//             <li>
//               <a href="#">Contact</a>
//             </li>
//           </ul>
//         </nav>
//       </div>
//       <div className="header-right">
//          <span className='loc'><LocationOnIcon className="location-icon"/>
//          <span className="adress">123 Arling,Niyola,NY</span></span>
//          <span className='phone'>
//          <PhoneIcon className="phone-icon"/>
//         <span className="phone-number">+0 123 456 7890</span></span>
//         <SearchIcon className="search-icon" />
//         <button
//           className={`login-btn ${isLoggedIn ? 'logged-in' : ''}`}
//           onClick={onLoginClick}
//         >
//           {isLoggedIn ? 'Logged In' : 'Log In'}
//         </button>
       
//       </div>
//     </header>
   
//     <div className="services-page">
//       <div className="services-page-header">
//         <h1>Patient Information</h1>
//       </div>

//       <div className="patient-form-container">
//         <form onSubmit={handleSubmit}>
//           <div className="form-grid">
//             <div className="form-group">
//               <label>First name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 placeholder="Enter first name"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Last name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 placeholder="Enter last name"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleInputChange}
//                 placeholder="Enter age"
//                 min="1"
//                 max="120"
//               />
//             </div>

//             <div className="form-group">
//               <label>Phone number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 placeholder="Enter phone number"
//               />
//             </div>

//             <div className="form-group full-width">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter email address"
//                 required
//               />
//             </div>

//             <div className="form-group full-width">
//               <label>Symptoms</label>
//               <textarea
//                 name="symptoms"
//                 value={formData.symptoms}
//                 onChange={handleInputChange}
//                 placeholder="Describe your symptoms..."
//               />
//             </div>
//           </div>

//           <div className="mri-section">
//             <div className="mri-checkbox">
//               <input
//                 type="checkbox"
//                 id="hasMRI"
//                 name="hasMRI"
//                 checked={formData.hasMRI}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="hasMRI">Have you done MRI?</label>
//             </div>

//             {formData.hasMRI && (
//               <label htmlFor="mriUpload" className="mri-upload-zone">
//                 <CloudUploadIcon className="upload-icon" />
//                 <p>Upload your MRI report</p>
//                 <p style={{ fontSize: '14px', color: '#666' }}>
//                   Click to browse or drag and drop
//                 </p>
//                 {formData.mriFile && (
//                   <p className="file-name">{formData.mriFile.name}</p>
//                 )}
//                 <input
//                   type="file"
//                   id="mriUpload"
//                   accept=".pdf,.jpg,.jpeg,.png,.dcm"
//                   onChange={handleFileChange}
//                 />
//               </label>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="submit-btn"
//             disabled={isAnalyzing}
//           >
//             {isAnalyzing ? 'Analyzing...' : 'Submit'}
//           </button>
//         </form>

//         {isAnalyzing && (
//           <div className="loading">
//             <p>Analyzing your data, please wait...</p>
//           </div>
//         )}

//         {showResults && analysisResult && (
//           <div className="results-section">
//             <h2>Want detailed information on your Result?</h2>
//             <div className="result-display">
//               <h3>Analysis Results</h3>
//               <p className={`status ${analysisResult.detected ? 'detected' : 'normal'}`}>
//                 Status: {analysisResult.status}
//               </p>
//               <p className="confidence">
//                 Confidence: {analysisResult.confidence}
//               </p>
//             </div>
//             <div className="result-buttons">
//               <button className="result-btn" onClick={handlePreviewResult}>
//                 Preview Result
//               </button>
//               <button className="result-btn" onClick={handleDownloadPDF}>
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
      
      
//       {showResults && <Subscribe />}
      
//     </div>
//     </div>
// );
// }

// export default BrainWorksApp;

























// import React, { useState } from 'react';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Subscribe from './Subscribe.jsx';
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PhoneIcon from '@mui/icons-material/Phone';
// import SearchIcon from '@mui/icons-material/Search';

// function BrainWorksApp() {
//   const [formData, setFormData] = useState({
//     firstName: '', lastName: '', age: '', phone: '', email: '',
//     symptoms: '', hasMRI: false, mriFile: null
//   });

//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [showDetection, setShowDetection] = useState(false); // Controls Home vs Services
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleDetectionClick = () => {
//     if (!isLoggedIn) {
//       alert('Please login first');
//       return;
//     }
//     setShowDetection(true); // Switch to the form view
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const onLoginClick = () => setIsLoggedIn(true);

//   const scrollToTop = () => {
//     setShowDetection(false); // Go back to Home view
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setFormData(prev => ({ ...prev, mriFile: file }));
//   };

//   const simulateAnalysis = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const detected = Math.random() > 0.5;
//         resolve({
//           status: detected ? 'Tumor Detected' : 'Normal',
//           confidence: `${(Math.random() * 20 + 80).toFixed(2)}%`,
//           detected: detected
//         });
//       }, 3000);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.firstName || !formData.email) {
//       alert('Please fill in required fields');
//       return;
//     }
//     setIsAnalyzing(true);
//     const result = await simulateAnalysis();
//     setAnalysisResult(result);
//     setIsAnalyzing(false);
//     setShowResults(true);
//   };

//   const handleDownloadPDF = () => {
//     const pdfContent = `BRAINWORKS MEDICAL ANALYSIS REPORT\nName: ${formData.firstName} ${formData.lastName}\nStatus: ${analysisResult.status}\nConfidence: ${analysisResult.confidence}`;
//     const blob = new Blob([pdfContent], { type: 'text/plain' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `Report_${formData.firstName}.txt`;
//     link.click();
//   };

//   const handlePreviewResult = () => {
//     alert(`Status: ${analysisResult.status}\nConfidence: ${analysisResult.confidence}`);
//   };

//   return (
//     <div className="app-container">
//       {/* HEADER - FIXED AT TOP, ONLY ONCE */}
//       <header className="header">
//         <div className="header-left">
//           <div className="logo" onClick={scrollToTop} style={{cursor: 'pointer'}}>
//             <PsychologyIcon className="psycology-icon" style={{fontSize : 40}}/>Brain<span>Works</span>
//           </div>
//           <nav>
//             <ul className="nav-links">
//               <li><a onClick={scrollToTop}>Home</a></li>
//               <li><a onClick={handleDetectionClick}>Services</a></li>
//               <li><a>About</a></li>
//               <li><a>Contact</a></li>
//             </ul>
//           </nav>
//         </div>
//         <div className="header-right">
//           <span className='loc'><LocationOnIcon className="location-icon"/><span className="adress">123 Arling,Niyola,NY</span></span>
//           <span className='phone'><PhoneIcon className="phone-icon"/><span className="phone-number">+0 123 456 7890</span></span>
//           <SearchIcon className="search-icon" />
//           <button className={`login-btn ${isLoggedIn ? 'logged-in' : ''}`} onClick={onLoginClick}>
//             {isLoggedIn ? 'Logged In' : 'Log In'}
//           </button>
//         </div>
//       </header>

//       {/* MAIN CONTENT AREA */}
//       <main>
//         {!showDetection ? (
//           /* HOME VIEW - ONLY VISIBLE WHEN showDetection IS FALSE */
        
//            <section className="hero">
//       <div className="hero-content">
//         <button 
//           className="liveLife-btn"
          
//         >
//           Live Your Life
//         </button>
//         <h1>We Care About Your Health</h1>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, 
//           luctus nec ullamcorper mattis, pulvinar dapibus leo.
//         </p>
//         <button 
//           className="contact-btn"
//           onClick={() => scrollToSection('footer')}
//         >
//           Contact Us
//         </button>
//       </div>
//       {/* <div className="hero-image">
//         <img src="https://timespro.com/_next/image?url=https%3A%2F%2Ftimesproweb-static-backend-prod.s3.ap-south-1.amazonaws.com%2FIIM_Indore_Executive_Programme_in_Healthcare_Management_Website_Banner_d49dc12155.webp&w=1920&q=75" alt="Professional doctor smiling" style={{height:700 , width :750}} />
//       </div> */}
//     </section>
//         ) : (
//           /* SERVICES VIEW - ONLY VISIBLE WHEN showDetection IS TRUE */
//            <div className="services-page">
// //       <div className="services-page-header">
// //         <h1>Patient Information</h1>
// //       </div>

// //       <div className="patient-form-container">
// //         <form onSubmit={handleSubmit}>
// //           <div className="form-grid">
// //             <div className="form-group">
// //               <label>First name</label>
// //               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 placeholder="Enter first name"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Last name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 placeholder="Enter last name"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleInputChange}
//                 placeholder="Enter age"
//                 min="1"
//                 max="120"
//               />
//             </div>

//             <div className="form-group">
//               <label>Phone number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 placeholder="Enter phone number"
//               />
//             </div>

//             <div className="form-group full-width">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter email address"
//                 required
//               />
//             </div>

//             <div className="form-group full-width">
//               <label>Symptoms</label>
//               <textarea
//                 name="symptoms"
//                 value={formData.symptoms}
//                 onChange={handleInputChange}
//                 placeholder="Describe your symptoms..."
//               />
//             </div>
//           </div>

//           <div className="mri-section">
//             <div className="mri-checkbox">
//               <input
//                 type="checkbox"
//                 id="hasMRI"
//                 name="hasMRI"
//                 checked={formData.hasMRI}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="hasMRI">Have you done MRI?</label>
//             </div>

//             {formData.hasMRI && (
//               <label htmlFor="mriUpload" className="mri-upload-zone">
//                 <CloudUploadIcon className="upload-icon" />
//                 <p>Upload your MRI report</p>
//                 <p style={{ fontSize: '14px', color: '#666' }}>
//                   Click to browse or drag and drop
//                 </p>
//                 {formData.mriFile && (
//                   <p className="file-name">{formData.mriFile.name}</p>
//                 )}
//                 <input
//                   type="file"
//                   id="mriUpload"
//                   accept=".pdf,.jpg,.jpeg,.png,.dcm"
//                   onChange={handleFileChange}
//                 />
//               </label>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="submit-btn"
//             disabled={isAnalyzing}
//           >
//             {isAnalyzing ? 'Analyzing...' : 'Submit'}
//           </button>
//         </form>

//         {isAnalyzing && (
//           <div className="loading">
//             <p>Analyzing your data, please wait...</p>
//           </div>
//         )}

//         {showResults && analysisResult && (
//           <div className="results-section">
//             <h2>Want detailed information on your Result?</h2>
//             <div className="result-display">
//               <h3>Analysis Results</h3>
//               <p className={`status ${analysisResult.detected ? 'detected' : 'normal'}`}>
//                 Status: {analysisResult.status}
//               </p>
//               <p className="confidence">
//                 Confidence: {analysisResult.confidence}
//               </p>
//             </div>
//             <div className="result-buttons">
//               <button className="result-btn" onClick={handlePreviewResult}>
//                 Preview Result
//               </button>
//               <button className="result-btn" onClick={handleDownloadPDF}>
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {showResults && <Subscribe />}
//     </div>
          
//         )}
//       </main>

//       {/* FOOTER SECTION */}
//       <footer className="footer-copyright" style={{padding: '20px', textAlign: 'center', borderTop: '1px solid #eee'}}>
//         <p>© 2026 BrainWorks. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default BrainWorksApp;
























// import React, { useState } from 'react';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Subscribe from './Subscribe.jsx';
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PhoneIcon from '@mui/icons-material/Phone';
// import SearchIcon from '@mui/icons-material/Search';

// function BrainWorksApp() {
//   const [formData, setFormData] = useState({
//     firstName: '', lastName: '', age: '', phone: '', email: '',
//     symptoms: '', hasMRI: false, mriFile: null
//   });

//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [showDetection, setShowDetection] = useState(false); // Controls Home vs Services view
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleDetectionClick = () => {
//     if (!isLoggedIn) {
//       alert('Please login first');
//       return;
//     }
//     setShowDetection(true); // Switch to Services form
//   };

//   const onLoginClick = () => setIsLoggedIn(true);
//   const scrollToTop = () => {
//     setShowDetection(false); // Go back to Home
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setFormData(prev => ({ ...prev, mriFile: file }));
//   };

//   const simulateAnalysis = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const detected = Math.random() > 0.5;
//         resolve({
//           status: detected ? 'Tumor Detected' : 'Normal',
//           confidence: `${(Math.random() * 20 + 80).toFixed(2)}%`,
//           detected: detected
//         });
//       }, 3000);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.firstName || !formData.email) {
//       alert('Please fill required fields');
//       return;
//     }
//     setIsAnalyzing(true);
//     const result = await simulateAnalysis();
//     setAnalysisResult(result);
//     setIsAnalyzing(false);
//     setShowResults(true);
//   };

//   // ... (handleDownloadPDF and handlePreviewResult remain the same as your original)
//   const handleDownloadPDF = () => { /* Your existing PDF code */ };
//   const handlePreviewResult = () => { /* Your existing Alert code */ };

//   return (
//     <div className="app-wrapper">
//       {/* HEADER - ALWAYS VISIBLE */}
//       <header className="header">
//         <div className="header-left">
//           <div className="logo" onClick={scrollToTop} style={{cursor:'pointer'}}>
//             <PsychologyIcon className="psycology-icon" style={{fontSize : 40}}/>Brain<span>Works</span>
//           </div>
//           <nav>
//             <ul className="nav-links">
//               <li><a onClick={scrollToTop}>Home</a></li>
//               <li><a onClick={handleDetectionClick}>Services</a></li>
//               <li><a>About</a></li>
//               <li><a>Contact</a></li>
//             </ul>
//           </nav>
//         </div>
//         <div className="header-right">
//           <span className='loc'><LocationOnIcon className="location-icon"/><span className="adress">123 Arling,Niyola,NY</span></span>
//           <span className='phone'><PhoneIcon className="phone-icon"/><span className="phone-number">+0 123 456 7890</span></span>
//           <SearchIcon className="search-icon" />
//           <button className={`login-btn ${isLoggedIn ? 'logged-in' : ''}`} onClick={onLoginClick}>
//             {isLoggedIn ? 'Logged In' : 'Log In'}
//           </button>
//         </div>
//       </header>

//       {/* CONDITIONAL MAIN CONTENT */}
//       <main className="main-content">
//         {!showDetection ? (
//           /* HOME HERO SECTION */
//           <section className="hero">
//             <div className="hero-text">
//               <span className="pill">Live Your Life</span>
//               <h1>We Care About Your Health</h1>
//               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
//               <button className="contact-btn" onClick={handleDetectionClick}>Our Services</button>
//             </div>
//             <div className="hero-image">
//               <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800" alt="Doctor" />
//             </div>
//           </section>
//         ) : (
//           /* SERVICES FORM SECTION */
//           <div className="services-page">
//             <div className="services-page-header">
//               <h1>Patient Information</h1>
//             </div>
//             <div className="patient-form-container">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label>First name</label>
//                     <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter first name" required />
//                   </div>
//                   <div className="form-group">
//                     <label>Last name</label>
//                     <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter last name" required />
//                   </div>
//                   <div className="form-group">
//                     <label>Age</label>
//                     <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Enter age" />
//                   </div>
//                   <div className="form-group">
//                     <label>Phone number</label>
//                     <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone number" />
//                   </div>
//                   <div className="form-group full-width">
//                     <label>Email</label>
//                     <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address" required />
//                   </div>
//                   <div className="form-group full-width">
//                     <label>Symptoms</label>
//                     <textarea name="symptoms" value={formData.symptoms} onChange={handleInputChange} placeholder="Describe your symptoms..." />
//                   </div>
//                 </div>

//                 <div className="mri-section">
//                   <div className="mri-checkbox">
//                     <input type="checkbox" id="hasMRI" name="hasMRI" checked={formData.hasMRI} onChange={handleInputChange} />
//                     <label htmlFor="hasMRI">Have you done MRI?</label>
//                   </div>
//                   {formData.hasMRI && (
//                     <label htmlFor="mriUpload" className="mri-upload-zone">
//                       <CloudUploadIcon className="upload-icon" />
//                       <p>Upload your MRI report</p>
//                       <input type="file" id="mriUpload" accept="image/*" onChange={handleFileChange} style={{display:'none'}} />
//                       {formData.mriFile && <p className="file-name">{formData.mriFile.name}</p>}
//                     </label>
//                   )}
//                 </div>

//                 <button type="submit" className="submit-btn" disabled={isAnalyzing}>
//                   {isAnalyzing ? 'Analyzing...' : 'Submit'}
//                 </button>
//               </form>

//               {showResults && analysisResult && (
//                 <div className="results-section">
//                   <h2>Want detailed information on your Result?</h2>
//                   <div className="result-display">
//                     <p className={`status ${analysisResult.detected ? 'detected' : 'normal'}`} 
//                        style={{color: analysisResult.detected ? 'red' : 'green', fontSize: '24px', fontWeight: 'bold'}}>
//                       Status: {analysisResult.status}
//                     </p>
//                     <p className="confidence">Confidence: {analysisResult.confidence}</p>
//                   </div>
//                   <div className="result-buttons">
//                     <button className="result-btn" onClick={handlePreviewResult}>Preview Result</button>
//                     <button className="result-btn" onClick={handleDownloadPDF}>Download PDF</button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </main>

//       {/* FOOTER - ALWAYS VISIBLE AT BOTTOM */}
//       <footer id="footer">
//         <Subscribe />
//         <div className="footer-copyright">
//           <p>© 2026 BrainWorks. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default BrainWorksApp;






// import React, { useState, useEffect } from 'react';
// //import './style.css';

// export default function BrainWorksApp() {
//   const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'services'
//   const [formData, setFormData] = useState({ firstName: '', lastName: '', age: '', phone: '', email: '', symptoms: '' });
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Scroll to top when switching pages
//   useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     // Simulate Gemini API Call
//     setTimeout(() => {
//       const isPositive = Math.random() > 0.5; // Simulated result logic
//       setAnalysisResult({
//         detected: isPositive,
//         confidence: (Math.random() * (99 - 85) + 85).toFixed(2), // Random confidence between 85-99%
//         message: isPositive ? "Brain Tumor Detected" : "No Abnormalities Detected"
//       });
//       setLoading(false);
//     }, 2000);
//   };

//   const downloadPDF = () => {
//     window.print(); // Simplest way to "generate" a report as PDF
//   };

//   return (
//     <div className="app-wrapper">
//       {/* 1. PERSISTENT NAVBAR */}
//       <nav className="navbar-container">
//         <div className="top-bar">
//           <span>📍 123 Arling, Niyola, NY</span>
//           <span>📞 +0 123 456 7890 &nbsp; <button className="login-btn">Log In</button></span>
//         </div>
//         <div className="main-nav">
//           <div className="logo" onClick={() => setCurrentPage('home')} style={{cursor:'pointer'}}>
//             <strong>BrainWorks</strong>
//           </div>
//           <div className="nav-links">
//             <span onClick={() => setCurrentPage('home')}>Home</span>
//             <span onClick={() => setCurrentPage('services')}>Services</span>
//             <span>About</span>
//             <span>Contact</span>
//           </div>
//           <button className="book-btn">Book Now</button>
//         </div>
//       </nav>

//       {/* 2. CONDITIONAL CONTENT */}
//       {currentPage === 'home' ? (
//         <header className="hero-section">
//           <div className="hero-content">
//             <span className="badge">Live Your Life</span>
//             <h1>We Care About Your Health</h1>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
//             <button className="btn-primary">Contact Us</button>
//           </div>
//           <div className="hero-image">
//             <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500" alt="Doctor" />
//           </div>
//         </header>
//       ) : (
//         <div className="services-view">
//           <h2>Patient Information</h2>
//           <form className="form-card" onSubmit={handleSubmit}>
//             <div className="grid-2">
//               <input name="firstName" placeholder="First name" onChange={handleInputChange} required />
//               <input name="lastName" placeholder="Last name" onChange={handleInputChange} required />
//             </div>
//             <div className="grid-2">
//               <input name="age" placeholder="Enter your age" type="number" onChange={handleInputChange} required />
//               <input name="phone" placeholder="Enter phone number" onChange={handleInputChange} required />
//             </div>
//             <input name="email" placeholder="Enter your email" type="email" style={{marginBottom: '20px'}} onChange={handleInputChange} required />
//             <textarea name="symptoms" placeholder="Enter your symptoms" rows="4" onChange={handleInputChange}></textarea>
            
//             <div className="upload-box">
//               <p>Upload your MRI report</p>
//               <input type="file" accept="image/*" />
//             </div>
            
//             <button type="submit" className="btn-primary" disabled={loading}>
//               {loading ? "Analyzing..." : "Submit"}
//             </button>
//           </form>

//           {analysisResult && (
//             <div className="result-section">
//               <h3>Want detailed information on your Result?</h3>
//               <div className="result-text" style={{ color: analysisResult.detected ? 'red' : 'green' }}>
//                 Status: {analysisResult.message}
//               </div>
//               <p>Confidence Level: {analysisResult.confidence}%</p>
//               <div className="btn-group">
//                 <button className="btn-primary">Preview Result</button>
//                 <button className="btn-primary" onClick={downloadPDF}>Download PDF</button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* 3. PERSISTENT FOOTER */}
//       <section className="subscribe-bar">
//         <h2>Subscribe Us To Get More Updates</h2>
//         <div className="sub-input">
//           <input type="email" placeholder="Your Email Address" />
//           <button>SUBSCRIBE</button>
//         </div>
//       </section>

//       <footer className="footer-main">
//         <div className="footer-col">
//           <h3>BrainWorks</h3>
//           <p>123 Arling, Niyola, NY</p>
//           <p>info@yourinfo.com</p>
//         </div>
//         <div className="footer-col">
//           <h4>Quick Links</h4>
//           <ul>
//             <li onClick={() => setCurrentPage('home')}>Home</li>
//             <li onClick={() => setCurrentPage('services')}>Services</li>
//             <li>Blog</li>
//             <li>Contact</li>
//           </ul>
//         </div>
//       </footer>
//     </div>
//   );
// }























// import React, { useState } from 'react';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Subscribe from './Subscribe.jsx';
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PhoneIcon from '@mui/icons-material/Phone';
// import SearchIcon from '@mui/icons-material/Search';


// function BrainWorksApp() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     age: '',
//     phone: '',
//     email: '',
//     symptoms: '',
//     hasMRI: false,
//     mriFile: null
//   });

//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [showDetection, setShowDetection] = useState(false);
// const [isLoggedIn, setIsLoggedIn] = useState(false);

// const handleDetectionClick = () => {
//   if (!isLoggedIn) {
//     alert('Please login first');
//     return;
//   }
//   setShowDetection(true);
// };

// const onLoginClick = () => {
//   setIsLoggedIn(true);
// };

// const scrollToSection = (id) => {
//   const el = document.getElementById(id);
//   if (el) el.scrollIntoView({ behavior: 'smooth' });
// };


//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, mriFile: file }));
//     }
//   };

//   const simulateAnalysis = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const random = Math.random();
//         const detected = random > 0.5;
//         const confidence = (Math.random() * 20 + 80).toFixed(2);

//         resolve({
//           status: detected ? 'Tumor Detected' : 'Normal',
//           confidence: `${confidence}%`,
//           detected: detected
//         });
//       }, 3000);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     if (formData.hasMRI && !formData.mriFile) {
//       alert('Please upload your MRI report');
//       return;
//     }

//     setIsAnalyzing(true);
//     setShowResults(false);

//     const result = await simulateAnalysis();

//     setAnalysisResult(result);
//     setIsAnalyzing(false);
//     setShowResults(true);
//   };

//   const handleDownloadPDF = () => {
//     const pdfContent = `
//       BRAINWORKS MEDICAL ANALYSIS REPORT
//       ====================================

//       Patient Information:
//       Name: ${formData.firstName} ${formData.lastName}
//       Age: ${formData.age}
//       Phone: ${formData.phone}
//       Email: ${formData.email}

//       Symptoms: ${formData.symptoms}

//       Analysis Results:
//       Status: ${analysisResult.status}
//       Confidence: ${analysisResult.confidence}

//       Date: ${new Date().toLocaleDateString()}

//       ====================================
//       This is a simulated report for demonstration purposes.
//     `;

//     const blob = new Blob([pdfContent], { type: 'text/plain' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `BrainWorks_Report_${formData.firstName}_${formData.lastName}.txt`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
//   };

//   const handlePreviewResult = () => {
//     alert(`
//       Analysis Result Preview:

//       Status: ${analysisResult.status}
//       Confidence: ${analysisResult.confidence}

//       Patient: ${formData.firstName} ${formData.lastName}
//       Date: ${new Date().toLocaleDateString()}
//     `);
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
    
   
//     <div className="services-page">
//       <div className="services-page-header">
//         <h1>Patient Information</h1>
//       </div>

//       <div className="patient-form-container">
//         <form onSubmit={handleSubmit}>
//           <div className="form-grid">
//             <div className="form-group">
//               <label>First name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 placeholder="Enter first name"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Last name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 placeholder="Enter last name"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleInputChange}
//                 placeholder="Enter age"
//                 min="1"
//                 max="120"
//               />
//             </div>

//             <div className="form-group">
//               <label>Phone number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 placeholder="Enter phone number"
//               />
//             </div>

//             <div className="form-group full-width">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter email address"
//                 required
//               />
//             </div>

//             <div className="form-group full-width">
//               <label>Symptoms</label>
//               <textarea
//                 name="symptoms"
//                 value={formData.symptoms}
//                 onChange={handleInputChange}
//                 placeholder="Describe your symptoms..."
//               />
//             </div>
//           </div>

//           <div className="mri-section">
//             <div className="mri-checkbox">
//               <input
//                 type="checkbox"
//                 id="hasMRI"
//                 name="hasMRI"
//                 checked={formData.hasMRI}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="hasMRI">Have you done MRI?</label>
//             </div>

//             {formData.hasMRI && (
//               <label htmlFor="mriUpload" className="mri-upload-zone">
//                 <CloudUploadIcon className="upload-icon" />
//                 <p>Upload your MRI report</p>
//                 <p style={{ fontSize: '14px', color: '#666' }}>
//                   Click to browse or drag and drop
//                 </p>
//                 {formData.mriFile && (
//                   <p className="file-name">{formData.mriFile.name}</p>
//                 )}
//                 <input
//                   type="file"
//                   id="mriUpload"
//                   accept=".pdf,.jpg,.jpeg,.png,.dcm"
//                   onChange={handleFileChange}
//                 />
//               </label>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="submit-btn"
//             disabled={isAnalyzing}
//           >
//             {isAnalyzing ? 'Analyzing...' : 'Submit'}
//           </button>
//         </form>

//         {isAnalyzing && (
//           <div className="loading">
//             <p>Analyzing your data, please wait...</p>
//           </div>
//         )}

//         {showResults && analysisResult && (
//           <div className="results-section">
//             <h2>Want detailed information on your Result?</h2>
//             <div className="result-display">
//               <h3>Analysis Results</h3>
//               <p className={`status ${analysisResult.detected ? 'detected' : 'normal'}`}>
//                 Status: {analysisResult.status}
//               </p>
//               <p className="confidence">
//                 Confidence: {analysisResult.confidence}
//               </p>
//             </div>
//             <div className="result-buttons">
//               <button className="result-btn" onClick={handlePreviewResult}>
//                 Preview Result
//               </button>
//               <button className="result-btn" onClick={handleDownloadPDF}>
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
      
      
//       {/* {showResults && <Subscribe />} */}
      
//     </div>
    
// );
// }

// export default BrainWorksApp;



























// import React, { useState } from 'react';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Subscribe from './Subscribe.jsx';
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PhoneIcon from '@mui/icons-material/Phone';
// import SearchIcon from '@mui/icons-material/Search';

// function BrainWorksApp() {
//   const [formData, setFormData] = useState({
//     firstName: '', lastName: '', age: '', phone: '', email: '',
//     symptoms: '', hasMRI: false, mriFile: null
//   });

//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [showDetection, setShowDetection] = useState(false); // Controls Home vs Services
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleDetectionClick = () => {
//     if (!isLoggedIn) {
//       alert('Please login first');
//       return;
//     }
//     setShowDetection(true); // Switch to the form view
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const onLoginClick = () => setIsLoggedIn(true);

//   const scrollToTop = () => {
//     setShowDetection(false); // Go back to Home view
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setFormData(prev => ({ ...prev, mriFile: file }));
//   };

//   const simulateAnalysis = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const detected = Math.random() > 0.5;
//         resolve({
//           status: detected ? 'Tumor Detected' : 'Normal',
//           confidence: `${(Math.random() * 20 + 80).toFixed(2)}%`,
//           detected: detected
//         });
//       }, 3000);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.firstName || !formData.email) {
//       alert('Please fill in required fields');
//       return;
//     }
//     setIsAnalyzing(true);
//     const result = await simulateAnalysis();
//     setAnalysisResult(result);
//     setIsAnalyzing(false);
//     setShowResults(true);
//   };

//   const handleDownloadPDF = () => {
//     const pdfContent = `BRAINWORKS MEDICAL ANALYSIS REPORT\nName: ${formData.firstName} ${formData.lastName}\nStatus: ${analysisResult.status}\nConfidence: ${analysisResult.confidence}`;
//     const blob = new Blob([pdfContent], { type: 'text/plain' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `Report_${formData.firstName}.txt`;
//     link.click();
//   };

//   const handlePreviewResult = () => {
//     alert(`Status: ${analysisResult.status}\nConfidence: ${analysisResult.confidence}`);
//   };

//   return (
//     <div className="app-container">
//       {/* HEADER - FIXED AT TOP, ONLY ONCE */}
//       <header className="header">
//         <div className="header-left">
//           <div className="logo" onClick={scrollToTop} style={{cursor: 'pointer'}}>
//             <PsychologyIcon className="psycology-icon" style={{fontSize : 40}}/>Brain<span>Works</span>
//           </div>
//           <nav>
//             <ul className="nav-links">
//               <li><a onClick={scrollToTop}>Home</a></li>
//               <li><a onClick={handleDetectionClick}>Services</a></li>
//               <li><a>About</a></li>
//               <li><a>Contact</a></li>
//             </ul>
//           </nav>
//         </div>
//         <div className="header-right">
//           <span className='loc'><LocationOnIcon className="location-icon"/><span className="adress">123 Arling,Niyola,NY</span></span>
//           <span className='phone'><PhoneIcon className="phone-icon"/><span className="phone-number">+0 123 456 7890</span></span>
//           <SearchIcon className="search-icon" />
//           <button className={`login-btn ${isLoggedIn ? 'logged-in' : ''}`} onClick={onLoginClick}>
//             {isLoggedIn ? 'Logged In' : 'Log In'}
//           </button>
//         </div>
//       </header>

//       {/* MAIN CONTENT AREA */}
//       <main>
//         {!showDetection ? (
//           /* HOME VIEW - ONLY VISIBLE WHEN showDetection IS FALSE */
        
//            <section className="hero">
//       <div className="hero-content">
//         <button 
//           className="liveLife-btn"
          
//         >
//           Live Your Life
//         </button>
//         <h1>We Care About Your Health</h1>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, 
//           luctus nec ullamcorper mattis, pulvinar dapibus leo.
//         </p>
//         <button 
//           className="contact-btn"
//           onClick={() => scrollToSection('footer')}
//         >
//           Contact Us
//         </button>
//       </div>
//       {/* <div className="hero-image">
//         <img src="https://timespro.com/_next/image?url=https%3A%2F%2Ftimesproweb-static-backend-prod.s3.ap-south-1.amazonaws.com%2FIIM_Indore_Executive_Programme_in_Healthcare_Management_Website_Banner_d49dc12155.webp&w=1920&q=75" alt="Professional doctor smiling" style={{height:700 , width :750}} />
//       </div> */}
//     </section>
//         ) : (
//           /* SERVICES VIEW - ONLY VISIBLE WHEN showDetection IS TRUE */
//            <div className="services-page">
// //       <div className="services-page-header">
// //         <h1>Patient Information</h1>
// //       </div>

// //       <div className="patient-form-container">
// //         <form onSubmit={handleSubmit}>
// //           <div className="form-grid">
// //             <div className="form-group">
// //               <label>First name</label>
// //               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 placeholder="Enter first name"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Last name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 placeholder="Enter last name"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleInputChange}
//                 placeholder="Enter age"
//                 min="1"
//                 max="120"
//               />
//             </div>

//             <div className="form-group">
//               <label>Phone number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 placeholder="Enter phone number"
//               />
//             </div>

//             <div className="form-group full-width">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter email address"
//                 required
//               />
//             </div>

//             <div className="form-group full-width">
//               <label>Symptoms</label>
//               <textarea
//                 name="symptoms"
//                 value={formData.symptoms}
//                 onChange={handleInputChange}
//                 placeholder="Describe your symptoms..."
//               />
//             </div>
//           </div>

//           <div className="mri-section">
//             <div className="mri-checkbox">
//               <input
//                 type="checkbox"
//                 id="hasMRI"
//                 name="hasMRI"
//                 checked={formData.hasMRI}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor="hasMRI">Have you done MRI?</label>
//             </div>

//             {formData.hasMRI && (
//               <label htmlFor="mriUpload" className="mri-upload-zone">
//                 <CloudUploadIcon className="upload-icon" />
//                 <p>Upload your MRI report</p>
//                 <p style={{ fontSize: '14px', color: '#666' }}>
//                   Click to browse or drag and drop
//                 </p>
//                 {formData.mriFile && (
//                   <p className="file-name">{formData.mriFile.name}</p>
//                 )}
//                 <input
//                   type="file"
//                   id="mriUpload"
//                   accept=".pdf,.jpg,.jpeg,.png,.dcm"
//                   onChange={handleFileChange}
//                 />
//               </label>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="submit-btn"
//             disabled={isAnalyzing}
//           >
//             {isAnalyzing ? 'Analyzing...' : 'Submit'}
//           </button>
//         </form>

//         {isAnalyzing && (
//           <div className="loading">
//             <p>Analyzing your data, please wait...</p>
//           </div>
//         )}

//         {showResults && analysisResult && (
//           <div className="results-section">
//             <h2>Want detailed information on your Result?</h2>
//             <div className="result-display">
//               <h3>Analysis Results</h3>
//               <p className={`status ${analysisResult.detected ? 'detected' : 'normal'}`}>
//                 Status: {analysisResult.status}
//               </p>
//               <p className="confidence">
//                 Confidence: {analysisResult.confidence}
//               </p>
//             </div>
//             <div className="result-buttons">
//               <button className="result-btn" onClick={handlePreviewResult}>
//                 Preview Result
//               </button>
//               <button className="result-btn" onClick={handleDownloadPDF}>
//                 Download PDF
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {showResults && <Subscribe />}
//     </div>
          
//         )}
//       </main>

//       {/* FOOTER SECTION */}
//       <footer className="footer-copyright" style={{padding: '20px', textAlign: 'center', borderTop: '1px solid #eee'}}>
//         <p>© 2026 BrainWorks. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default BrainWorksApp;
























// import React, { useState } from 'react';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Subscribe from './Subscribe.jsx';
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PhoneIcon from '@mui/icons-material/Phone';
// import SearchIcon from '@mui/icons-material/Search';

// function BrainWorksApp() {
//   const [formData, setFormData] = useState({
//     firstName: '', lastName: '', age: '', phone: '', email: '',
//     symptoms: '', hasMRI: false, mriFile: null
//   });

//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [showDetection, setShowDetection] = useState(false); // Controls Home vs Services view
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleDetectionClick = () => {
//     if (!isLoggedIn) {
//       alert('Please login first');
//       return;
//     }
//     setShowDetection(true); // Switch to Services form
//   };

//   const onLoginClick = () => setIsLoggedIn(true);
//   const scrollToTop = () => {
//     setShowDetection(false); // Go back to Home
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setFormData(prev => ({ ...prev, mriFile: file }));
//   };

//   const simulateAnalysis = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const detected = Math.random() > 0.5;
//         resolve({
//           status: detected ? 'Tumor Detected' : 'Normal',
//           confidence: `${(Math.random() * 20 + 80).toFixed(2)}%`,
//           detected: detected
//         });
//       }, 3000);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.firstName || !formData.email) {
//       alert('Please fill required fields');
//       return;
//     }
//     setIsAnalyzing(true);
//     const result = await simulateAnalysis();
//     setAnalysisResult(result);
//     setIsAnalyzing(false);
//     setShowResults(true);
//   };

//   // ... (handleDownloadPDF and handlePreviewResult remain the same as your original)
//   const handleDownloadPDF = () => { /* Your existing PDF code */ };
//   const handlePreviewResult = () => { /* Your existing Alert code */ };

//   return (
//     <div className="app-wrapper">
//       {/* HEADER - ALWAYS VISIBLE */}
//       <header className="header">
//         <div className="header-left">
//           <div className="logo" onClick={scrollToTop} style={{cursor:'pointer'}}>
//             <PsychologyIcon className="psycology-icon" style={{fontSize : 40}}/>Brain<span>Works</span>
//           </div>
//           <nav>
//             <ul className="nav-links">
//               <li><a onClick={scrollToTop}>Home</a></li>
//               <li><a onClick={handleDetectionClick}>Services</a></li>
//               <li><a>About</a></li>
//               <li><a>Contact</a></li>
//             </ul>
//           </nav>
//         </div>
//         <div className="header-right">
//           <span className='loc'><LocationOnIcon className="location-icon"/><span className="adress">123 Arling,Niyola,NY</span></span>
//           <span className='phone'><PhoneIcon className="phone-icon"/><span className="phone-number">+0 123 456 7890</span></span>
//           <SearchIcon className="search-icon" />
//           <button className={`login-btn ${isLoggedIn ? 'logged-in' : ''}`} onClick={onLoginClick}>
//             {isLoggedIn ? 'Logged In' : 'Log In'}
//           </button>
//         </div>
//       </header>

//       {/* CONDITIONAL MAIN CONTENT */}
//       <main className="main-content">
//         {!showDetection ? (
//           /* HOME HERO SECTION */
//           <section className="hero">
//             <div className="hero-text">
//               <span className="pill">Live Your Life</span>
//               <h1>We Care About Your Health</h1>
//               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
//               <button className="contact-btn" onClick={handleDetectionClick}>Our Services</button>
//             </div>
//             <div className="hero-image">
//               <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800" alt="Doctor" />
//             </div>
//           </section>
//         ) : (
//           /* SERVICES FORM SECTION */
//           <div className="services-page">
//             <div className="services-page-header">
//               <h1>Patient Information</h1>
//             </div>
//             <div className="patient-form-container">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label>First name</label>
//                     <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter first name" required />
//                   </div>
//                   <div className="form-group">
//                     <label>Last name</label>
//                     <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter last name" required />
//                   </div>
//                   <div className="form-group">
//                     <label>Age</label>
//                     <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Enter age" />
//                   </div>
//                   <div className="form-group">
//                     <label>Phone number</label>
//                     <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone number" />
//                   </div>
//                   <div className="form-group full-width">
//                     <label>Email</label>
//                     <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address" required />
//                   </div>
//                   <div className="form-group full-width">
//                     <label>Symptoms</label>
//                     <textarea name="symptoms" value={formData.symptoms} onChange={handleInputChange} placeholder="Describe your symptoms..." />
//                   </div>
//                 </div>

//                 <div className="mri-section">
//                   <div className="mri-checkbox">
//                     <input type="checkbox" id="hasMRI" name="hasMRI" checked={formData.hasMRI} onChange={handleInputChange} />
//                     <label htmlFor="hasMRI">Have you done MRI?</label>
//                   </div>
//                   {formData.hasMRI && (
//                     <label htmlFor="mriUpload" className="mri-upload-zone">
//                       <CloudUploadIcon className="upload-icon" />
//                       <p>Upload your MRI report</p>
//                       <input type="file" id="mriUpload" accept="image/*" onChange={handleFileChange} style={{display:'none'}} />
//                       {formData.mriFile && <p className="file-name">{formData.mriFile.name}</p>}
//                     </label>
//                   )}
//                 </div>

//                 <button type="submit" className="submit-btn" disabled={isAnalyzing}>
//                   {isAnalyzing ? 'Analyzing...' : 'Submit'}
//                 </button>
//               </form>

//               {showResults && analysisResult && (
//                 <div className="results-section">
//                   <h2>Want detailed information on your Result?</h2>
//                   <div className="result-display">
//                     <p className={`status ${analysisResult.detected ? 'detected' : 'normal'}`} 
//                        style={{color: analysisResult.detected ? 'red' : 'green', fontSize: '24px', fontWeight: 'bold'}}>
//                       Status: {analysisResult.status}
//                     </p>
//                     <p className="confidence">Confidence: {analysisResult.confidence}</p>
//                   </div>
//                   <div className="result-buttons">
//                     <button className="result-btn" onClick={handlePreviewResult}>Preview Result</button>
//                     <button className="result-btn" onClick={handleDownloadPDF}>Download PDF</button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </main>

//       {/* FOOTER - ALWAYS VISIBLE AT BOTTOM */}
//       <footer id="footer">
//         <Subscribe />
//         <div className="footer-copyright">
//           <p>© 2026 BrainWorks. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default BrainWorksApp;











// import React, { useState } from 'react';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Subscribe from './Subscribe.jsx';
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PhoneIcon from '@mui/icons-material/Phone';
// import SearchIcon from '@mui/icons-material/Search';

// const styles = {
//   page: {
//     backgroundColor: "#cfe0ff",
//     minHeight: "100vh",
//     padding: "60px 0",
//   },

//   header: {
//     textAlign: "center",
//     fontSize: "28px",
//     fontWeight: "600",
//     color: "#1d2b5f",
//    // marginBottom: "20px",
//    marginTop : "40px",
//   },

//   formContainer: {
//     maxWidth: "900px",
//     margin: "0 auto",
//     backgroundColor: "#cfe0ff",
//     padding: "40px",
//     borderRadius: "12px",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "20px",
//   },

//   formGroup: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "6px",
//   },

//   label: {
//     fontSize: "14px",
//     color: "#1d2b5f",
//     fontWeight: "500",
//   },

//   input: {
//     padding: "14px 16px",
//     borderRadius: "8px",
//     border: "1px solid #9bb1e5",
//     backgroundColor: "#e6efff",
//     fontSize: "14px",
//     outline: "none",
//   },

//   textarea: {
//     padding: "14px 16px",
//     borderRadius: "8px",
//     border: "1px solid #9bb1e5",
//     backgroundColor: "#e6efff",
//     fontSize: "14px",
//     minHeight: "120px",
//     resize: "none",
//   },

//   fullWidth: {
//     gridColumn: "span 2",
//   },

//   mriSection: {
//     marginTop: "30px",
//   },

//   checkboxRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     fontSize: "14px",
//     color: "#1d2b5f",
//     marginBottom: "20px",
//   },

//   uploadZone: {
//     border: "2px dashed #9bb1e5",
//     borderRadius: "10px",
//     padding: "40px",
//     textAlign: "center",
//     backgroundColor: "#e6efff",
//     color: "#5b6c9d",
//     cursor: "pointer",
//   },

//   uploadIcon: {
//     fontSize: "40px",
//     color: "#1d2b5f",
//     marginBottom: "10px",
//   },

//   submitBtn: {
//     margin: "30px auto 0",
//     display: "block",
//     backgroundColor: "#1d2b5f",
//     color: "#fff",
//     border: "none",
//     padding: "14px 50px",
//     borderRadius: "8px",
//     fontSize: "15px",
//     cursor: "pointer",
//   },

//   loading: {
//     marginTop: "30px",
//     textAlign: "center",
//     color: "#1d2b5f",
//     fontWeight: "500",
//   },

//   resultsSection: {
//     marginTop: "80px",
//     textAlign: "center",
//   },

//   resultsTitle: {
//     fontSize: "26px",
//     fontWeight: "600",
//     color: "#1d2b5f",
//     marginBottom: "30px",
//   },

//   resultButtons: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "30px",
//     marginTop: "30px",
//   },

//   resultBtn: {
//     backgroundColor: "#1d2b5f",
//     color: "#fff",
//     padding: "14px 40px",
//     borderRadius: "8px",
//     border: "none",
//     cursor: "pointer",
//   },

//   statusDetected: {
//     color: "#c62828",
//     fontWeight: "600",
//   },

//   statusNormal: {
//     color: "#2e7d32",
//     fontWeight: "600",
//   },
// };

// function BrainWorksApp() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     age: '',
//     phone: '',
//     email: '',
//     symptoms: '',
//     hasMRI: false,
//     mriFile: null
//   });

//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [showDetection, setShowDetection] = useState(false);
// const [isLoggedIn, setIsLoggedIn] = useState(false);

// const handleDetectionClick = () => {
//   if (!isLoggedIn) {
//     alert('Please login first');
//     return;
//   }
//   setShowDetection(true);
// };

// const onLoginClick = () => {
//   setIsLoggedIn(true);
// };

// const scrollToSection = (id) => {
//   const el = document.getElementById(id);
//   if (el) el.scrollIntoView({ behavior: 'smooth' });
// };


//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, mriFile: file }));
//     }
//   };

//   const simulateAnalysis = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const random = Math.random();
//         const detected = random > 0.5;
//         const confidence = (Math.random() * 20 + 80).toFixed(2);

//         resolve({
//           status: detected ? 'Tumor Detected' : 'Normal',
//           confidence: `${confidence}%`,
//           detected: detected
//         });
//       }, 3000);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     if (formData.hasMRI && !formData.mriFile) {
//       alert('Please upload your MRI report');
//       return;
//     }

//     setIsAnalyzing(true);
//     setShowResults(false);

//     const result = await simulateAnalysis();

//     setAnalysisResult(result);
//     setIsAnalyzing(false);
//     setShowResults(true);
//   };

//   const handleDownloadPDF = () => {
//     const pdfContent = `
//       BRAINWORKS MEDICAL ANALYSIS REPORT
//       ====================================

//       Patient Information:
//       Name: ${formData.firstName} ${formData.lastName}
//       Age: ${formData.age}
//       Phone: ${formData.phone}
//       Email: ${formData.email}

//       Symptoms: ${formData.symptoms}

//       Analysis Results:
//       Status: ${analysisResult.status}
//       Confidence: ${analysisResult.confidence}

//       Date: ${new Date().toLocaleDateString()}

//       ====================================
//       This is a simulated report for demonstration purposes.
//     `;

//     const blob = new Blob([pdfContent], { type: 'text/plain' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `BrainWorks_Report_${formData.firstName}_${formData.lastName}.txt`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
//   };

//   const handlePreviewResult = () => {
//     alert(`
//       Analysis Result Preview:

//       Status: ${analysisResult.status}
//       Confidence: ${analysisResult.confidence}

//       Patient: ${formData.firstName} ${formData.lastName}
//       Date: ${new Date().toLocaleDateString()}
//     `);
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//   <div style={styles.page}>
//     <h1 style={styles.header}>Patient Information</h1>

//     <div style={styles.formContainer}>
//       <form onSubmit={handleSubmit}>
//         <div style={styles.grid}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>First name</label>
//             <input
//               style={styles.input}
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               placeholder="Enter first name"
//               required
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Last name</label>
//             <input
//               style={styles.input}
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               placeholder="Enter last name"
//               required
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Age</label>
//             <input
//               style={styles.input}
//               type="number"
//               name="age"
//               value={formData.age}
//               onChange={handleInputChange}
//               placeholder="Enter your age"
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>Phone number</label>
//             <input
//               style={styles.input}
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               placeholder="Enter contact number"
//             />
//           </div>

//           <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
//             <label style={styles.label}>Email</label>
//             <input
//               style={styles.input}
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
//             <label style={styles.label}>Symptoms</label>
//             <textarea
//               style={styles.textarea}
//               name="symptoms"
//               value={formData.symptoms}
//               onChange={handleInputChange}
//               placeholder="e.g., Memory loss , speech difficulty , vision issues, weakness , balance issues etc.."
//             />
//           </div>
//         </div>

//         <div style={styles.mriSection}>
//           <div style={styles.checkboxRow}>
//             <input
//               type="checkbox"
//               name="hasMRI"
//               checked={formData.hasMRI}
//               onChange={handleInputChange}
//             />
//             <span>Have you done MRI?</span>
//           </div>

//           {formData.hasMRI && (
//             <label style={styles.uploadZone}>
//               <CloudUploadIcon style={styles.uploadIcon} />
//               <p>Upload your MRI report</p>
//               {formData.mriFile && <p>{formData.mriFile.name}</p>}
//               <input
//                 type="file"
//                 hidden
//                 accept=".pdf,.jpg,.jpeg,.png,.dcm"
//                 onChange={handleFileChange}
//               />
//             </label>
//           )}
//         </div>

//         <button style={styles.submitBtn} disabled={isAnalyzing}>
//           {isAnalyzing ? "Analyzing..." : "Submit"}
//         </button>
//       </form>

//       {isAnalyzing && (
//         <div style={styles.loading}>
//           Analyzing your data, please wait...
//         </div>
//       )}

//       {showResults && analysisResult && (
//         <div style={styles.resultsSection}>
//           <h2 style={styles.resultsTitle}>
//             Want detailed information on your Result?
//           </h2>

//           <p
//             style={
//               analysisResult.detected
//                 ? styles.statusDetected
//                 : styles.statusNormal
//             }
//           >
//             Status: {analysisResult.status}
//           </p>

//           <p>Confidence: {analysisResult.confidence}</p>

//           <div style={styles.resultButtons}>
//             <button style={styles.resultBtn} onClick={handlePreviewResult}>
//               Preview Result
//             </button>
//             <button style={styles.resultBtn} onClick={handleDownloadPDF}>
//               Download PDF
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

// }

// export default BrainWorksApp;







import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const styles = {
  page: {
    backgroundColor: "#cfe0ff",
    minHeight: "100vh",
    padding: "60px 0",
  },

  header: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "600",
    color: "#1d2b5f",
    marginBottom: "40px",
  },

  formContainer: {
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#cfe0ff",
    padding: "40px",
    borderRadius: "12px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    fontSize: "14px",
    color: "#1d2b5f",
    fontWeight: "500",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "8px",
    border: "1px solid #9bb1e5",
    backgroundColor: "#e6efff",
    fontSize: "14px",
  },

  textarea: {
    padding: "14px 16px",
    borderRadius: "8px",
    border: "1px solid #9bb1e5",
    backgroundColor: "#e6efff",
    fontSize: "14px",
    minHeight: "120px",
    resize: "none",
  },

  fullWidth: {
    gridColumn: "span 2",
  },

  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: "#1d2b5f",
    margin: "30px 0 15px",
  },

  /* 🔥 MRI CARD */
  mriCard: {
    border: "2px dashed #9bb1e5",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "#e6efff",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.3s",
  },

  uploadIcon: {
    fontSize: "44px",
    color: "#1d2b5f",
    marginBottom: "10px",
  },

  previewImage: {
    width: "100%",
    maxHeight: "280px",
    objectFit: "contain",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  fileName: {
    fontSize: "13px",
    color: "#1d2b5f",
    marginTop: "6px",
  },

  submitBtn: {
    margin: "30px auto 0",
    display: "block",
    backgroundColor: "#1d2b5f",
    color: "#fff",
    border: "none",
    padding: "14px 50px",
    borderRadius: "8px",
    fontSize: "15px",
    cursor: "pointer",
  },

  resultsSection: {
    marginTop: "80px",
    textAlign: "center",
  },

  resultsTitle: {
    fontSize: "26px",
    fontWeight: "600",
    color: "#1d2b5f",
    marginBottom: "20px",
  },

  resultButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "30px",
  },

  resultBtn: {
    backgroundColor: "#1d2b5f",
    color: "#fff",
    padding: "14px 40px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },

  detected: {
    color: "#c62828",
    fontWeight: "600",
  },

  normal: {
    color: "#2e7d32",
    fontWeight: "600",
  },
};

function BrainWorksApp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    email: "",
    symptoms: "",
    hasMRI: false,
    mriFile: null,
  });

  const [mriPreview, setMriPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, mriFile: file }));

    if (file.type.startsWith("image/")) {
      setMriPreview(URL.createObjectURL(file));
    }
  };

  const simulateAnalysis = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        const detected = Math.random() > 0.5;
        resolve({
          status: detected ? "Tumor Detected" : "No Tumor Detected",
          confidence: `${(Math.random() * 20 + 80).toFixed(2)}%`,
          detected,
        });
      }, 3000);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.hasMRI && !formData.mriFile) {
      alert("Please upload MRI image");
      return;
    }

    setIsAnalyzing(true);
    setShowResults(false);

    const result = await simulateAnalysis();
    setAnalysisResult(result);

    setIsAnalyzing(false);
    setShowResults(true);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>Patient Information</h1>

      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.grid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name</label>
              <input style={styles.input} name="firstName" onChange={handleInputChange} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name</label>
              <input style={styles.input} name="lastName" onChange={handleInputChange} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Age</label>
              <input style={styles.input} name="age" type="number" onChange={handleInputChange} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone</label>
              <input style={styles.input} name="phone" onChange={handleInputChange} />
            </div>

            <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
              <label style={styles.label}>Email</label>
              <input style={styles.input} name="email" type="email" onChange={handleInputChange} />
            </div>

            <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
              <label style={styles.label}>Symptoms</label>
              <textarea style={styles.textarea} name="symptoms" onChange={handleInputChange} />
            </div>
          </div>

          <div style={styles.checkboxRow}>
            <input type="checkbox" name="hasMRI" onChange={handleInputChange} />
            <span>Have you done MRI?</span>
          </div>

          {formData.hasMRI && (
            <label style={styles.mriCard}>
              {mriPreview ? (
                <>
                  <img src={mriPreview} alt="MRI Preview" style={styles.previewImage} />
                  <p style={{ fontSize: "13px", color: "#1d2b5f" }}>
                    Click to replace MRI image
                  </p>
                </>
              ) : (
                <>
                  <CloudUploadIcon style={styles.uploadIcon} />
                  <p>Upload MRI Scan</p>
                  <p style={{ fontSize: "13px", color: "#6b7bbf" }}>
                    JPG / PNG / JPEG
                  </p>
                </>
              )}

              {formData.mriFile && (
                <p style={styles.fileName}>{formData.mriFile.name}</p>
              )}

              <input hidden type="file" accept="image/*" onChange={handleFileChange} />
            </label>
          )}

          <button style={styles.submitBtn}>
            {isAnalyzing ? "Analyzing..." : "Submit"}
          </button>
        </form>

        {showResults && analysisResult && (
          <div style={styles.resultsSection}>
            <h2 style={styles.resultsTitle}>Diagnostic Verdict</h2>
            <p style={analysisResult.detected ? styles.detected : styles.normal}>
              {analysisResult.status}
            </p>
            <p>Confidence: {analysisResult.confidence}</p>

            <div style={styles.resultButtons}>
              <button style={styles.resultBtn}>Preview Result</button>
              <button style={styles.resultBtn}>Download PDF</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrainWorksApp;