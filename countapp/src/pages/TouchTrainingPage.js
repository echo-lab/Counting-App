import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../styles/gamePage.css";
import { useAppData } from "../context/Context.js";
import Tray1 from "../assests/TrayB.png";
import BigBird from "../assests/BigBird.png";
import greenTray from "../assests/greenTray.png";
import purpleTray from "../assests/purpleTray.png"
import "bootstrap/dist/css/bootstrap.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Animation from "../components/animation";
import { useSound } from '../helpers/SoundContext';
import { textToSpeech } from '../helpers/textToSpeech';
import DialogBox from "../components/dialogBox";
import {handleInteraction, handleNextClickTraining} from '../helpers/imageTouchData';

const TouchTrainingPage = () => {
  const { sectionTrainData, audioData } = useAppData();
  const { page } = useParams();
  const currentPage = parseInt(page);
  const [cookieCount, setCookieCount] = useState(0);
  const [showBigBird, setShowBigBird] = useState(false);
  const [showTray2, setShowTray2] = useState(false);
  const [selectedTray, setSelectedTray] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [activeCookieId, setActiveCookieId] = useState(1);
  const [showGrayArea, setshowGrayArea] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const spokenRef = useRef(false);
  const spokenRef2 = useRef(false);
  const once = useRef(false);
  const { soundEnabled } = useSound();
  const [modalShow, setModalShow] = useState(false);
  const [startAnimation, setstartAnimation] = useState(false);
  const [touchData, setTouchData] = useState([]);

  const handleAnimationFinish = () => {
    
    setTimeout(() => {
        const audioElement2 = new Audio();
        switch (sectionTrainData.pages[currentPage].cookies.length) {
          case 1:
            audioElement2.src = audioData.circling.total1;
            break;
          case 2:
            audioElement2.src = audioData.circling.total2;
            break;
          default:
            return;
        }
        audioElement2.play();
    
        audioElement2.onended = () => {
          if (!spokenRef2.current) {
            setTimeout(() => {
              setshowGrayArea(true);
              setstartAnimation(false);
              setShowMessage(true);
              setShowBigBird(true);
              setShowTray2(true);

              if (soundEnabled) {
              const utterance = `${sectionTrainData.pages[currentPage].message2}`;
              textToSpeech(utterance);
              }
              spokenRef2.current = true;
            }, 1000);
          }
        };
      }, 1000);
      
  };

  const speakUtterance = () => {
    if(soundEnabled){
    const utterance = `${sectionTrainData.pages[currentPage].message1}`;

    setTimeout(() => {
      textToSpeech(utterance)
    }, 1000);
  }
  };

  useEffect(() => {
    if (!spokenRef.current) {
      speakUtterance();
      spokenRef.current = true;
    }
  }, [currentPage]);

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

  const message = showMessage
  ? `${sectionTrainData.pages[currentPage].message2}`
  : `${sectionTrainData.pages[currentPage].message1}`;

    const moveCircle = (id, currentPage) => {
      setIsWiggling(true)
      setTimeout(() => {
        setIsWiggling(false);
      }, 2000);
      const totalCount = sectionTrainData.pages[currentPage].cookies.length - 1;
      const numericId = parseInt(id);
    
      if (cookieCount <= totalCount) {
        if (numericId === activeCookieId) {
          
          if ("speechSynthesis" in window) {
            const audioElement = new Audio();
    
            switch (id) {
              case "1":
                audioElement.src = audioData.trills[0];
                break;
              case "2":
                audioElement.src = audioData.trills[1];
                break;
              case "3":
                audioElement.src = audioData.trills[2];
                break;
              case "4":
                audioElement.src = audioData.trills[3];
                break;
              case "5":
                audioElement.src = audioData.trills[4];
                break;
              case "6":
                audioElement.src = audioData.trills[5];
                break;
              case "7":
                audioElement.src = audioData.trills[6];
                break;
              case "8":
                audioElement.src = audioData.trills[7];
                break;
              case "9":
                audioElement.src = audioData.trills[8];
                break;
              case "10":
                audioElement.src = audioData.trills[9];
                break;
              default:
                return;
            }
    
            audioElement.play();
    
            if (cookieCount < totalCount) {
              audioElement.onend = setTimeout(function () {
                setCookieCount((prevCount) => prevCount + 1);
                setActiveCookieId(numericId + 1);
              }, 2200);
            }
            if (cookieCount === totalCount) {
              audioElement.onend = setTimeout(function () {
                setCookieCount((prevCount) => prevCount + 1);
              }, 2200);
            }
          } else {
            console.error("SpeechSynthesis API is not supported in this browser.");
          }
        }
      }
      if (cookieCount === totalCount) {
        setActiveCookieId(null);
        setstartAnimation(true);      
      }
    };
    

  const handleNextPage = () => {
    if (currentPage < 1) {
      setCookieCount(0)
      setShowTray2(false);
      setShowBigBird(false);
      setShowMessage(false);
      setActiveCookieId(1);
      setshowGrayArea(false);
      setSelectedTray(null);
      spokenRef.current = false;
      spokenRef2.current = false;
      handleNextClickTraining(touchData, "touch", currentPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCookieCount(0)
      setShowTray2(false);
      setShowBigBird(false);
      setShowMessage(false);
      setActiveCookieId(1);
      setshowGrayArea(false);
      setSelectedTray(null);
      spokenRef.current = false;
      spokenRef2.current = false;
    }
  };

  const setModelshow = () =>{
    handleNextClickTraining(touchData, "touch", currentPage);
    setModalShow(true)
  }

  const storeAnswer = (answerKey, answerValue) => {
    const storedAnswersJSON = localStorage.getItem('TouchTrainingAnswers');
    const storedAnswersObject = storedAnswersJSON ? JSON.parse(storedAnswersJSON) : {};

    storedAnswersObject[answerKey] = answerValue;
  
    localStorage.setItem('TouchTrainingAnswers', JSON.stringify(storedAnswersObject));
  };

  const handleTrayClick = (trayType) => {
    setSelectedTray(trayType);
    storeAnswer(currentPage, trayType);
  };

  return (
    <div className="container">
    <div className="row">
      
      <div className={showGrayArea? "col-4 cookiecol graybg" : "col-4 cookiecol"}>
          {showGrayArea  && <div className="overlay"></div>}
          <div className="background-container">
            <img src={Tray1} alt="tray1"/>
          </div>
          <div className="card">
            <div className="card-body">
             {message}
            </div>
          </div>
          <div className="cookieContainer position-absolute">
            {sectionTrainData.pages[currentPage].cookies.map((cookie) => (
              <img
                key={cookie.id}
                src={cookie.img}
                id={cookie.id}
                className={`${activeCookieId === cookie.id ? "circle" : ""} ${activeCookieId === cookie.id && isWiggling ? "wiggle" : ""}`}
                alt={`Cookie ${cookie.id}`}
                onClick={() => moveCircle(cookie.id.toString(), currentPage)}
                style={{
                  position: "absolute",
                  top: cookie.top,
                  left: cookie.left,
                }}
              />
            ))}
          </div>
          {startAnimation && (<div className="anim"><Animation onAnimationFinish={handleAnimationFinish}/></div>)}
        </div>

          <div className="col-8 position-absolute tray-container">
            {showTray2 && (
              <div>
              <div
                className={`tray-overlay1 ${selectedTray === "greenTray" ? "glow1" : ""}`}
                onClick={() => handleTrayClick("greenTray")}
              />
              <img
                src={greenTray}
                alt="greentray"
                className="tray2"
                id="greenTray"
                key="greenTray"
              />
              <div className="greenBiscuits position-absolute">
              {sectionTrainData.pages[currentPage].greenTray[0].biscuits.map((biscuit) => (
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
              ))}
              </div>
            </div>
            )}

            {showTray2 && (
              <div> 
                <div
                  className={`tray-overlay2 ${selectedTray === "purpleTray" ? "glow2" : ""}`}
                  onClick={() => handleTrayClick("purpleTray")}
                />      
                <img
                  src={purpleTray}
                  className="tray3"
                  id="purpleTray"
                  key="purpleTray"
                  alt="purpletray"
                />
              <div className="greenBiscuits position-absolute">
              {sectionTrainData.pages[currentPage].purpleTray[0].biscuits.map((biscuit) => (
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
              ))}
              </div>
            </div>
            )}
            {showBigBird && (
              <img src={BigBird} className="bigBird" id="bigBird" key="bigBird" alt="bigbird"/>
            )}
          </div>
          <div className="buttons">
              {currentPage > 0 
                ? (<button onClick={handlePreviousPage}><Link to={`/game/touch/training/${currentPage - 1}`}><ArrowBackIosIcon /></Link></button>) 
                : (<button disabled> <ArrowBackIosIcon /></button>)}
              {currentPage < 1 
                ?  ( <button onClick={handleNextPage}><Link to={`/game/touch/training/${currentPage + 1}`}><ArrowForwardIosIcon /></Link></button>) 
                : (<button onClick={setModelshow}> <ArrowForwardIosIcon /></button>)}
                  <DialogBox show={modalShow} onHide={() => setModalShow(false)} page="practice"/>
          </div>
      </div>
      <div><button className="homeLogo"><Link to={`/game/home`}><HomeRoundedIcon /></Link></button></div>
      </div>
  );
};

export default TouchTrainingPage;
