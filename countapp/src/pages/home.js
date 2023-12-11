import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";
import image3 from "../assests/image3.jpg";
import "bootstrap/dist/css/bootstrap.css";
import Profile from "../components/profile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SaveIcon from '@mui/icons-material/Save';
import { useSound } from "../helpers/SoundContext";
import { saveAnswers } from "../helpers/SaveAnswers";
import { BASE_URL } from '../helpers/constants.js';

function Home() {
  const [userData, setuserData] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const { soundEnabled, setSoundEnabled } = useSound();
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(soundEnabled);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    console.log("token:", token);
    const fetchData = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/userData`, {
          token: token,
        });
        setuserData(response.data.data);
        console.log(response.data.data);
        if (response.data.data == "token expired") {
          alert("Login again");
          window.localStorage.clear();
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
  };

  const handleToggle = () => {
    setTextToSpeechEnabled(!textToSpeechEnabled);
    setSoundEnabled(!textToSpeechEnabled);
  };

  const handleSave = () => {
    saveAnswers();
    console.log("hi")
  };

  return (
    <div className="home">
       <button onClick={handleSave} className="save-btn"><SaveIcon /></button>
      <div className="toggle">
        <label className="toggle-label">
          Enable Sound:
          <div className="toggle-switch">
            <input
              type="checkbox"
              className="toggle-checkbox"
              checked={textToSpeechEnabled}
              onChange={handleToggle}
            />
            <div className="toggle-slider"></div>
          </div>
        </label>
      </div>
      <div className="profileButton">
        <button onClick={handleProfileClick}>
          <AccountCircleIcon />
        </button>{" "}
      </div>
      {profileOpen && (
        <div className="profileContainer">
          <Profile name={userData.uname} />
        </div>
      )}
      <div className="container">
      <div className="row align-items-center">
        <div className="col-2 justify-content-center">
          <button className="hmMenu btn-lg "><Link to="/game/train/0">Base Training</Link></button>
        </div>
        <div className="col-8">
        <div className="row centered-row">
              <div className="menu-container">
                <button className="menu-button btn-lg btn-block"><Link to="/game/base/0">Baseline Category</Link></button>
                <button className="menu-button btn-lg btn-block"><Link to="/game/play/0">Touch Category</Link></button>
                <button className="menu-button btn-lg btn-block"><Link to="/game/animation/play/0">Animated Category</Link></button>
              </div>
            </div>
            <div className="row centered-row">
              <div className="menu-container">
                <button className="menu-button btn-lg btn-block"><Link to="/game/base/training/0">Baseline Training</Link></button>
                <button className="menu-button btn-lg btn-block"><Link to="/game/touch/training/0">Touch Training</Link></button>
                <button className="menu-button btn-lg btn-block"><Link to="/game/animation/training/0">Animated Training</Link></button>
              </div>
          </div>
        </div>
        <div className="col-2">
          <button className="hmMenu btn-lg"><Link to="/game/practice/0">Practice Counting</Link></button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
