import React, {useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "../styles/training.css";
import { useAppData } from "../context/Context.js";
import ImageContainer from '../components/imageContainer';
import Tray1 from "../assests/TrayB.png";
import BigBird from "../assests/BigBird.png";
import greenTray from "../assests/greenTray.png";
import purpleTray from "../assests/purpleTray.png"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useSound } from '../helpers/SoundContext';
import { textToSpeech } from '../helpers/textToSpeech';
import DialogBox from "../components/dialogBox";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import {handleInteraction, handleNextClickTraining} from '../helpers/imageTouchData';


function training() {
    const { trainData } = useAppData();
    const { page } = useParams();
    const currentPage = parseInt(page);
    const { soundEnabled } = useSound();
    const messageRef = useRef(false);
    const [modalShow, setModalShow] = useState(false);
    const [touchData, setTouchData] = useState([]);
    const once = useRef(false)


    useEffect(() => {
      if(!once.current){
        document.addEventListener('touchstart', (event) => {
          handleInteraction(event, setTouchData);
        });
  
        once.current = true
    
        return () => {
          document.removeEventListener('touchstart', (event) => {
            handleInteraction(event, setTouchData);
          });
        };
      }
    }, []);

    const speakMessage = () => {
      if(soundEnabled){
      const utterance = `${trainData.pages[currentPage].message[0]}`;
  
      setTimeout(() => {
        textToSpeech(utterance)
      }, 1000);
    }
    };
  
    useEffect(() => {
      if (!messageRef.current) {
        speakMessage();
        messageRef.current = true;
      }
    }, [currentPage]);

    const handleNextPage = () => {
      if (currentPage < 12) {
        messageRef.current = false;
        handleNextClickTraining(touchData, "starter", currentPage);
      }
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 0) {
        messageRef.current = false;
      }
    };

    const setModelshow = () =>{
      handleNextClickTraining(touchData, "starter", currentPage);
      setModalShow(true)
    }

  return (
    <div className='container'>
     {currentPage < 5 ? (
        <div className='container'>
          <ImageContainer currentpage={currentPage}/>
        </div>
      ) : (
    <div className='row'>
      <div className='col-2  cookiecol'>
         <div className="background-container">
            <img src={Tray1} alt="tray1" className='tray1'/>
          </div>
          <div className="card">
            <div className="card-body">
            {trainData.pages[currentPage].message}
            </div>
          </div>
          <div className="cookieContainer position-absolute">
          {trainData.pages[currentPage].cookies.length > 0 
            ? (trainData.pages[currentPage].cookies.map((cookie) => (
              <img
                key={cookie.id}
                src={cookie.img}
                id={cookie.id}
                alt={`Cookie ${cookie.id}`}
                style={{
                  position: "absolute",
                  top: cookie.top,
                  left: cookie.left,
                }}
              />
            )))
            : (<p></p>)}
          </div>
        </div>
            <div className='col-8 position-absolute tray-container'>
              <div>
            <img
                src={greenTray}
                alt="greentray"
                className="tray2"
                id="greenTray"
                key="greenTray"
              />
              <div className="biscuitContainer position-absolute">
              {trainData.pages[currentPage].greenTray[0].biscuits.length > 0 
                ? (trainData.pages[currentPage].greenTray[0].biscuits.map((biscuit) => (
                <img
                  key={biscuit.id}
                  src={biscuit.img}
                  id={biscuit.id}
                  className="biscuits"
                  style={{
                    position: "absolute",
                    top: biscuit.top,
                    left: biscuit.left,
                  }}
                />
              ))) 
                : (<p></p>)}
              </div>
              </div>

              <div>
              <img
                  src={purpleTray}
                  className="tray3"
                  id="purpleTray"
                  key="purpleTray"
                  alt="purpletray"
                />
              <div className="biscuitContainer position-absolute">
              {trainData.pages[currentPage].purpleTray[0].biscuits.length > 0
                ? (trainData.pages[currentPage].purpleTray[0].biscuits.map((biscuit) => (
                <img
                  key={biscuit.id}
                  src={biscuit.img}
                  id={biscuit.id}
                  className="biscuits"
                  style={{
                    position: "absolute",
                    top: biscuit.top,
                    left: biscuit.left,
                  }}
                />
              )))
              : (<p></p>)}
              </div>
              </div>
              <img src={BigBird} className="bigBird" id="bigBird" key="bigBird" alt="bigbird"/>
        </div>
    </div>
          )}
            <div className="buttons">
              {currentPage > 0 
                ? (<button onClick={handlePreviousPage}><Link to={`/game/train/${currentPage - 1}`}><ArrowBackIosIcon /></Link></button>) 
                : (<button disabled> <ArrowBackIosIcon /></button>)}
              {currentPage < 8 
                ?  ( <button  onClick={handleNextPage}><Link to={`/game/train/${currentPage + 1}`}><ArrowForwardIosIcon /></Link></button>) 
                : (<button onClick={setModelshow}> <ArrowForwardIosIcon /></button>)}
                  <DialogBox show={modalShow} onHide={() => setModalShow(false)} page="play"/>
          </div>
          <div><button className="homeLogo"><Link to={`/game/home`}><HomeRoundedIcon /></Link></button></div>
          </div>
  )
}

export default training
