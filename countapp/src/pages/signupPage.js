import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../styles/signup.css';
import image2 from '../assests/image2.jpg'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { BASE_URL } from '../helpers/constants.js';

function SignupPage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log("Name:",name)
    const response = await axios.post(`${BASE_URL}/register`,{
      name: name,
    }).then((res) =>{
      if(res.status == 200){
        window.localStorage.setItem("token", res.data.data);
        window.localStorage.setItem("loggedIn", true);
      }
    });
    setName('');
    navigate('/game/selection');
  }

  return (
    <div className="signup">
          <div className="signupcard mx-auto">
            <div className='row row-signup'>
              <div className="col-md-6 left-column">
                <img src={image2} className="card-img" alt="" />
              </div>
              <div className="col-md-6 right-column">
              <div className="welcome-header">
              <span className="icon"><SentimentVerySatisfiedIcon fontSize="large"/></span> 
                <h3 className="welcome-text">Welcome!</h3>
            </div>
              <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Enter Name"
                          value={name} 
                          onChange={e => setName(e.target.value)}/>
                    </div>
                    <button type="submit" className="button">Start</button>
                    </form>
              </div>
            </div>
        </div>
    </div>
  );
}

export default SignupPage;
