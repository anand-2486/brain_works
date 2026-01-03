// import React, { useState, useEffect } from 'react';
// import Header from './components/Header.jsx';
// import Hero from './components/Hero.jsx';
// import StatsBar from './components/StatsBar.jsx';
// import Services from './components/Services.jsx';
// import TestimonialsAbout from './components/TestimonialsAbout.jsx';
// import FAQ from './components/FAQ.jsx';
// import CardiologyClinic from './components/CardiologyClinic.jsx';
// import Partners from './components/Partners.jsx';
// import Subscribe from './components/Subscribe.jsx';
// import Footer from './components/Footer.jsx';
// import LoginModal from './components/LoginModal.jsx';
// //import BrainWorksApp from './components/detection.jsx'
// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   //  const [showDetection, setShowDetection] = useState(false);


//   // const handleLoginClick = () => {
//   //   if (!isLoggedIn) {
//   //     setShowLoginModal(true);
//   //   }
//   // };
  


// const handleLoginClick = () => {
//   // Simulate Google Login popup
//   const confirmed = window.confirm("Do you want to sign in with Google?");
//   if (confirmed) {
//     setShowLoginModal(true);
//     alert("Successfully authenticated with Google!");
//   }
// };

//   const handleGoogleLogin = () => {
//     setIsLoggedIn(true);
//     setShowLoginModal(false);
//   };

//   const handleServicesClick = () => {
//     if (!isLoggedIn) {
//       alert('Please login first');
//     } else {
//      // window.location.href = 'detection.jsx';
//       // setPage("detection");
//       setShowDetection(true);
//     }
//   };

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="app">
//       <Header
//         isLoggedIn={isLoggedIn}
//         onLoginClick={handleLoginClick}
//         onServicesClick={handleServicesClick}
//         scrollToSection={scrollToSection}
//         scrollToTop={scrollToTop}
//       />
      
//       <Hero scrollToSection={scrollToSection} />
//       <StatsBar />
//       <Services />
//       <TestimonialsAbout />
//       <FAQ />
//       <CardiologyClinic />
//       <Partners />
//       <Subscribe />
//       <Footer
//         onServicesClick={handleServicesClick}
//         scrollToSection={scrollToSection}
//         scrollToTop={scrollToTop}
//       />
//       {showLoginModal && (
//         <LoginModal
//           onClose={() => setShowLoginModal(false)}
//           onGoogleLogin={handleGoogleLogin}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import StatsBar from './components/StatsBar.jsx';
import Services from './components/Services.jsx';
import TestimonialsAbout from './components/TestimonialsAbout.jsx';
import FAQ from './components/FAQ.jsx';
import CardiologyClinic from './components/CardiologyClinic.jsx';
import Partners from './components/Partners.jsx';
import Subscribe from './components/Subscribe.jsx';
import Footer from './components/Footer.jsx';
import LoginModal from './components/LoginModal.jsx';
import BrainWorksApp from './components/detection.jsx';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
    const [showDetection, setShowDetection] = useState(false);


  // const handleLoginClick = () => {
  //   if (!isLoggedIn) {
  //     setShowLoginModal(true);
  //   }
  // };
  


const handleLoginClick = () => {
  // Simulate Google Login popup
  const confirmed = window.confirm("Do you want to sign in with Google?");
  if (confirmed) {
    setShowLoginModal(true);
    alert("Successfully authenticated with Google!");
  }
};

  const handleGoogleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleServicesClick = () => {
    if (!isLoggedIn) {
      alert('Please login first');
    } else {
     // window.location.href = 'detection.jsx';
      // setPage("detection");
      setShowDetection(true);
      window.scrollTo(0, 0);
    }
  };

  const scrollToSection = (sectionId) => {
    // const element = document.getElementById(sectionId);
    // if (element) {
    //   element.scrollIntoView({ behavior: 'smooth' });
    // }
    if (showDetection) setShowDetection(false);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onServicesClick={handleServicesClick}
        scrollToSection={scrollToSection}
        setShowDetection={scrollToSection}
        //scrollToTop={scrollToTop}
      />
      
      {showDetection ? (<BrainWorksApp/>):(
        <>
      <Hero scrollToSection={scrollToSection} />
      <StatsBar />
      <Services />
      <TestimonialsAbout />
      <FAQ />
      <CardiologyClinic />
      <Partners />
      <Subscribe />
      </>
      )}
      <Footer
        onServicesClick={handleServicesClick}
        scrollToSection={scrollToSection}
        //scrollToTop={scrollToTop}
      />
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onGoogleLogin={handleGoogleLogin}
        />
      )}
    </div>
  );
}

export default App;
