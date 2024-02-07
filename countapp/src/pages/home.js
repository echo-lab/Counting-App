import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
              <li><Link to="/game/train/0"><button className="menu-button">Introduction</button></Link></li>
              <li><Link to="/game/base/training/0"><button className="menu-button">Baseline Training 1</button></Link></li>
              <li><Link to="/game/base/0"><button className="menu-button">Baseline Task 1</button></Link></li>
              <li><Link to="/game/animation/training/0"><button className="menu-button">Animated Training</button></Link></li>
              <li><Link to="/game/animation/play/0"><button className="menu-button">Animated Task</button></Link></li>
              <li><Link to="/game/base2/training/0"><button className="menu-button">Baseline Training 2</button></Link></li>
              <li><Link to="/game/base2/0"><button className="menu-button">Baseline Task 2</button></Link></li>
              <li><Link to="/game/touch/training/0"><button className="menu-button">Touch Training</button></Link></li>
              <li><Link to="/game/touch/play/0"><button className="menu-button">Touch Task</button></Link></li>
              <li><Link to="/game/practice/0"><button className="menu-button">Practice Counting</button></Link></li>
            </ul>
          </div>
        ) : (
          <div className="col">
            <div className="button-list">
            <li><Link to="/game/train/0"><button className="menu-button">Introduction</button></Link></li>
              <li><Link to="/game/base/training/0"><button className="menu-button">Baseline Training 1</button></Link></li>
              <li><Link to="/game/base/0"><button className="menu-button">Baseline Task 1</button></Link></li>
              <li><Link to="/game/touch/training/0"><button className="menu-button">Touch Training</button></Link></li>
              <li><Link to="/game/touch/play/0"><button className="menu-button">Touch Task</button></Link></li>
              <li><Link to="/game/base2/training/0"><button className="menu-button">Baseline Training 2</button></Link></li>
              <li><Link to="/game/base2/0"><button className="menu-button">Baseline Task 2</button></Link></li>
              <li><Link to="/game/animation/training/0"><button className="menu-button">Animated Training</button></Link></li>
              <li><Link to="/game/animation/play/0"><button className="menu-button">Animated Task</button></Link></li>
              <li><Link to="/game/practice/0"><button className="menu-button">Practice Counting</button></Link></li>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
