import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';
import profileicon from '../assests/profileicon.png'

function profile({name}) {

  const navigate = useNavigate();

  const handleLogout = (callback) => {
    window.localStorage.clear();
    if (typeof callback === 'function') {
      callback();
    }
  };

  const handleLogoutClick = () => {
    handleLogout(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <div className="container">
        <div className="card p-4 profileCard">
          <div className=" profileimage d-flex flex-column">
            <button className="btn btn-secondary">
              <img src={profileicon} height="100" />
            </button>
            <span className="name mt-3">{name}</span>
            <div className=" d-flex mt-2">
            <Link to="/"><button className="btn1 btn-dark" onClick={handleLogoutClick}>Log Out</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;
