import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";


const Navbar = () => {
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email,setEmail]=useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const handleClick = () => setClick(!click);

    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        // setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setEmail('');
        window.location.reload();
    }
    const handleDropdown = () => {
      setShowDropdown(!showDropdown);
    }
    useEffect(() => { 
      const storedemail = sessionStorage.getItem("email");

      if (storedemail) {
            setIsLoggedIn(true);
            setUsername(storedemail);
          }
        }, []);
  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
        StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i></Link>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={click ? 'nav__links active' : 'nav__links'}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/instant-consultation">Instant Consultation</Link>
        </li>
        <li className="link">
          <Link to="/search/doctors">Appointments</Link>
        </li>
        {/* <li className="link">
          <Link to="/healthblog">Health Blog</Link>
        </li> */}
        <li className="link">
         <Link to="/reviews">Reviews</Link>
        </li>
        {isLoggedIn?(
          <>
            <li className="link dropdown">
              <span onClick={handleDropdown} style={{cursor: "pointer"}}>
                Welcome, {username.split("@")[0]} <i className="fa fa-caret-down"></i>
              </span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    Your profile
                  </Link>
                  <Link to="/reports" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    Your reports
                  </Link>
                </div>
              )}
            </li>
            {/* <li className="link">
                Welcome, {username.split("@")[0]}
            </li> */}
            <li className="link">
              <button className="btn2" onClick={handleLogout}>
                Logout
              </button>
            </li>
            
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;


