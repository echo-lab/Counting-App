import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import "../styles/home.css";
import image3 from "../assests/image3.jpg";
import "bootstrap/dist/css/bootstrap.css";
import Profile from '../components/profile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSound } from '../helpers/SoundContext';

function Home() {
  const [userData, setuserData] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const { soundEnabled, setSoundEnabled } = useSound();
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(soundEnabled);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    console.log("token:",token)
    const fetchData = async () => {
      try {
        const response = await axios.post(`/userData`, {
          token: token,
        });
        setuserData(response.data.data);
        console.log(response.data.data)
        if(response.data.data == 'token expired'){
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
    <div className='home'>
      <div className='toggle'>
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
      <div className="profileButton"><button onClick={handleProfileClick}><AccountCircleIcon /></button> </div>
          {profileOpen && <div className='profileContainer'><Profile name={userData.uname} /></div>}
      <div className='row centered-row'>
        <div className='menu-container'>
          <button className="menu-button btn-lg btn-block"><Link to="/game/train/0">Training</Link></button>
          <button className="menu-button btn-lg btn-block"><Link to="/game/play/0">Start Game</Link></button>
          <button className="menu-button btn-lg btn-block"><Link to="/game/practice/0">Practice Counting</Link></button>
          <button className="menu-button btn-lg btn-block"><Link to="/game/animation/play/0">Animated Counting</Link></button>
        </div>
      </div>
    </div>
  );
}

export default Home;
