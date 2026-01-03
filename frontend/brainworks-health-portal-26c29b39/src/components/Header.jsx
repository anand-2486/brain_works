// import React from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import PhoneIcon from '@mui/icons-material/Phone';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import BrainWorksApp  from './detection.jsx';
// import {useState}  from 'react'


// function Header({ isLoggedIn, onLoginClick, onServicesClick, scrollToSection, scrollToTop }) {
//    const [showDetection, setShowDetection] = useState(false);

//    const handleDetectionClick = () => {
//     if (!isLoggedIn) {
//       alert('Please login first');
//     } else {
//      // window.location.href = 'detection.jsx';
//       // setPage("detection");
//       setShowDetection(true);
//     }
//   };
//   return (
//     <header className="header">
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
//               {!showDetection?(
//               <a onClick={handleDetectionClick}>Services</a>) :(<BrainWorksApp/>)}
//             </li>
//             <li>
//               <a onClick={() => scrollToSection('about')}>About</a>
//             </li>
//             <li>
//               <a onClick={() => scrollToSection('footer')}>Contact</a>
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
//   );
// }

// export default Header;






import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PsychologyIcon from '@mui/icons-material/Psychology';
//import BrainWorksApp  from './detection.jsx';
//import {useState}  from 'react'


function Header({ isLoggedIn, onLoginClick, onServicesClick, scrollToSection, setShowDetection }) {
   //const [showDetection, setShowDetection] = useState(false);

  //  const handleDetectionClick = () => {
  //   if (!isLoggedIn) {
  //     alert('Please login first');
  //   } else {
  //    // window.location.href = 'detection.jsx';
  //     // setPage("detection");
  //     setShowDetection(true);
  //   }
  // };
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo" onClick={()=>setShowDetection(false)}>
          <PsychologyIcon className="psycology-icon" style={{fontSize : 40}}/>Brain<span>Works</span>
        </div>
        <hr></hr>
         
        <nav>
          <ul className="nav-links">
            <li>
              <a onClick={()=>setShowDetection(false)}>Home</a>
            </li>
            <li>
              
              <a onClick={onServicesClick}>Services</a>
            </li>
            <li>
              <a onClick={() =>{setShowDetection(false) ;scrollToSection('about');}}>About</a>
            </li>
            <li>
              <a onClick={() => scrollToSection('footer')}>Contact</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-right">
         <span className='loc'><LocationOnIcon className="location-icon"/>
         <span className="adress">123 Arling,Niyola,NY</span></span>
         <span className='phone'>
         <PhoneIcon className="phone-icon"/>
        <span className="phone-number">+0 123 456 7890</span></span>
        <SearchIcon className="search-icon" />
        <button
          className="login-btn"
          onClick={onLoginClick}
        >
          {isLoggedIn ? 'Logged In' : 'Log In'}
        </button>
       
      </div>
    </header>
  );
}

export default Header;





