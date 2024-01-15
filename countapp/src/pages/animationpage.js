import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../styles/gamePage.css";
import animationData from "../data/animationData.js";
import Tray1 from "../assests/TrayB.png";
import Trill1 from "../assests/audio/1.mp3";
import Trill2 from "../assests/audio/2.mp3";
import Trill3 from "../assests/audio/3.mp3";
import Trill4 from "../assests/audio/4.mp3";
import Trill5 from "../assests/audio/5.mp3";
import Trill6 from "../assests/audio/6.mp3";
import Trill7 from "../assests/audio/7.mp3";
import Trill8 from "../assests/audio/8.mp3";
import Trill9 from "../assests/audio/9.mp3";
import Trill10 from "../assests/audio/10.mp3";
import total10 from "../assests/audio/CirclingT1.mp3"
import total5 from "../assests/audio/CirclingT2.mp3"
import BigBird from "../assests/BigBird.png";
import greenTray from "../assests/greenTray.png";
import purpleTray from "../assests/purpleTray.png"
import "bootstrap/dist/css/bootstrap.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnimationNoCircle from "../components/animationNoCircleDraw.js";
import { useSound } from '../helpers/SoundContext';
import { textToSpeech } from '../helpers/textToSpeech';
import DialogBox from "../components/dialogBox";
import {handleInteraction, handleNextClickTouchData} from '../helpers/imageTouchData';

const animationPage = () => {
  const { page } = useParams();
  const currentPage =  parseInt(page);
  const [showBigBird, setShowBigBird] = useState(false);
  const [showTray2, setShowTray2] = useState(false);
  const [selectedTray, setSelectedTray] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [activeCookieIndex, setActiveCookieIndex] = useState(0);
  const [showGrayArea, setshowGrayArea] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const spokenRef = useRef(false);
  const spokenRef2 = useRef(false);
  const once = useRef(false);
  const { soundEnabled } = useSound();
  const [modalShow, setModalShow] = useState(false);
  const [startAnimation, setstartAnimation] = useState(false);
  const [touchData, setTouchData] = useState([]);
  const [firstAudioStarted, setFirstAudioStarted] = useState(false);


  const audioUrls = [Trill1, Trill2,Trill3,Trill4,Trill5,Trill6,Trill7,Trill8,Trill9,Trill10];


  const handleAnimationFinish = () => {
    
    setTimeout(() => {
        const audioElement2 = new Audio();
        switch (animationData.pages[currentPage].cookies.length) {
          case 5:
            audioElement2.src = total5;
            break;
          case 10:
            audioElement2.src = total10;
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
              const utterance = `Can Big Bird also have ${animationData.pages[currentPage].cookies.length} cookies? Which tray has ${animationData.pages[currentPage].cookies.length} cookies? Green or purple?`;
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
    const utterance = `Cookie Monster has ${animationData.pages[currentPage].cookies.length} cookies. Let's count together!`;

    setTimeout(() => {
      textToSpeech(utterance, () => {
        console.log('Speech has ended. Do something here.');
        setFirstAudioStarted(true);
        setActiveCookieIndex(0); 
      })
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
  ? `Can Big Bird also have ${animationData.pages[currentPage].cookies.length} cookies? Which tray has ${animationData.pages[currentPage].cookies.length} cookies? Green or purple?`
  : `Cookie Monster has ${animationData.pages[currentPage].cookies.length} cookies. Let's count together!`;


useEffect(() => {
  if(firstAudioStarted == true){
    if (activeCookieIndex <= animationData.pages[currentPage].cookies.length) {
      setIsWiggling(true);
      const audio = new Audio(audioUrls[activeCookieIndex]);
      audio.play();
      audio.onended = () => {
        setIsWiggling(false);
      if (activeCookieIndex === animationData.pages[currentPage].cookies.length - 1) {
        setActiveCookieIndex(999);
        setstartAnimation(true);
      } else {
        setTimeout(() => {
          setActiveCookieIndex(activeCookieIndex + 1);
        }, 2000); 
      }
    };
    }}
  }, [activeCookieIndex, firstAudioStarted]);

    

  const handleNextPage = () => {
    if (currentPage < 3) {
      setShowTray2(false);
      setShowBigBird(false);
      setShowMessage(false);
      setActiveCookieIndex(0);
      setshowGrayArea(false);
      setSelectedTray(null);
      spokenRef.current = false;
      spokenRef2.current = false;
      handleNextClickTouchData(touchData, "Animation", currentPage);
      setFirstAudioStarted(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setShowTray2(false);
      setShowBigBird(false);
      setShowMessage(false);
      setActiveCookieIndex(0);
      setshowGrayArea(false);
      setSelectedTray(null);
      spokenRef.current = false;
      spokenRef2.current = false;
      setFirstAudioStarted(false);
    }
  };

  const setModelshow = () =>{
    handleNextClickTouchData(touchData, "Animation", currentPage);
    setModalShow(true)
  }

  const storeAnswer = (answerKey, answerValue) => {
    const storedAnswersJSON = localStorage.getItem('animationCategoryAnswers');
    const storedAnswersObject = storedAnswersJSON ? JSON.parse(storedAnswersJSON) : {};

    storedAnswersObject[answerKey] = answerValue;
  
    localStorage.setItem('animationCategoryAnswers', JSON.stringify(storedAnswersObject));
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
            {animationData.pages[currentPage].cookies.map((cookie) => (
              <img
                key={cookie.id}
                src={cookie.img}
                id={cookie.id}
                className={`${activeCookieIndex+1 === cookie.id ? "circle" : ""} ${activeCookieIndex+1 === cookie.id && isWiggling ? "wiggle" : ""}`}
                alt={`Cookie ${cookie.id}`}
                // onClick={() => moveCircle(cookie.id.toString(), currentPage)}
                style={{
                  position: "absolute",
                  top: cookie.top,
                  left: cookie.left,
                }}
              />
            ))}
          </div>
          {startAnimation && (<div className="anim"><AnimationNoCircle onAnimationFinish={handleAnimationFinish}/></div>)}
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
              {animationData.pages[currentPage].greenTray[0].biscuits.map((biscuit) => (
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
              {animationData.pages[currentPage].purpleTray[0].biscuits.map((biscuit) => (
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
                ? (<button onClick={handlePreviousPage}><Link to={`/game/animation/play/${currentPage - 1}`}><ArrowBackIosIcon /></Link></button>) 
                : (<button disabled> <ArrowBackIosIcon /></button>)}
              {currentPage < 3 
                ?  ( <button onClick={handleNextPage}><Link to={`/game/animation/play/${currentPage + 1}`}><ArrowForwardIosIcon /></Link></button>) 
                : (<button onClick={setModelshow}> <ArrowForwardIosIcon /></button>)}
                  <DialogBox show={modalShow} onHide={() => setModalShow(false)} page="practice"/>
          </div>
      </div>
      <div><button className="homeLogo"><Link to={`/game/home`}><HomeRoundedIcon /></Link></button></div>
      </div>
  );
};

export default animationPage;
