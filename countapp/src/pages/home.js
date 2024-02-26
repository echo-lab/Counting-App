import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";
import image3 from "../assests/image3.jpg";
import "bootstrap/dist/css/bootstrap.css";
import Profile from "../components/profile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSound } from "../helpers/SoundContext";
import { useAppData } from '../context/Context';
import { BASE_URL } from '../helpers/constants.js';



function Home() {
  const { selectedOption } = useAppData();
  const [userData, setuserData] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const { soundEnabled, setSoundEnabled } = useSound();
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(soundEnabled);
  const clickedButtons = (JSON.parse(localStorage.getItem('clickedMenuButtons')) || []);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

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

  const handleMenubtnClick = (index, link) => {
    if (!clickedButtons.includes(index)) {
      clickedButtons.push(index)
      localStorage.setItem('clickedMenuButtons', JSON.stringify(clickedButtons));
    }
    navigate(link);
  };


  return (
    <div className="home">
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
        </div>
        {selectedOption === 'A' ? (
          <div className="col">
            <ul className="button-list">
              <li><button className={`menu-button ${clickedButtons.includes(0) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(0, `/game/train/0`)}>Introduction</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(1) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(1, "/game/base/training/0")}>Baseline Training 1</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(2) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(2, "/game/base/0")}>Baseline Task 1</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(3) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(3, "/game/animation/training/0")}>Animated Training</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(4) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(4, "/game/animation/play/0")}>Animated Task</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(5) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(5, "/game/base2/training/0")}>Baseline Training 2</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(6) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(6, "/game/base2/0")}>Baseline Task 2</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(7) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(7, "/game/touch/training/0")}>Touch Training</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(8) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(8, "/game/touch/play/0")}>Touch Task</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(9) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(9, "/game/practice/0")}>Practice Counting</button></li>
            </ul>
          </div>
        ) : (
          <div className="col">
            <div className="button-list">
              <li><button className={`menu-button ${clickedButtons.includes(0) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(0, `/game/train/0`)}>Introduction</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(1) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(1, "/game/base/training/0")}>Baseline Training 1</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(2) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(2, `/game/base/0`)}>Baseline Task 1</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(3) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(3, "/game/touch/training/0")}>Touch Training</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(4) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(4, "/game/touch/play/0")}>Touch Task</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(5) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(5, "/game/base2/training/0")}>Baseline Training 2</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(6) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(6, "/game/base2/0")}>Baseline Task 2</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(7) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(7, "/game/animation/training/0")}>Animated Training</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(8) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(8, "/game/animation/play/0")}>Animated Task</button></li>
              <li><button className={`menu-button ${clickedButtons.includes(9) ? 'clicked' : ''}`} onClick={() => handleMenubtnClick(9, "/game/practice/0")}>Practice Counting</button></li>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
