import React, { useState, useEffect, useRef, useCallback } from "react";
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
import {handleInteraction, handleNextClickTouchData} from '../helpers/imageTouchData';
import { saveAnswers } from "../helpers/SaveAnswers";


const gamePage = () => {
  const { Data, audioData, selectedOption } = useAppData();
  const { page } = useParams();
  const currentPage = parseInt(page);
  const [cookieCount, setCookieCount] = useState(0);
  const [showBigBird, setShowBigBird] = useState(false);
  const [showTray2, setShowTray2] = useState(false);
  const [selectedTray, setSelectedTray] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [activeCookieId, setActiveCookieId] = useState(0);
  const [showGrayArea, setshowGrayArea] = useState(false);

  // state to handle the wiggling of the cookie
  const [wigglingCookie, setWigglingCookie] = useState({});
  
  // state to handle the inteactivity of the user
  const [userInteracted, setUserInteracted] = useState(false);
  const inactivityTimeout = 5000; // 5 seconds
  const wiggleDuration = 2000; // 2 seconds

  const spokenRef = useRef(false);
  const spokenRef2 = useRef(false);
  const once = useRef(false);
  const { soundEnabled } = useSound();
  const [modalShow, setModalShow] = useState(false);
  const [startAnimation, setstartAnimation] = useState(false);
  const [touchData, setTouchData] = useState([]);

  // state to count the number of cookies clicked
  const [count, setCount] = useState(0);

  // state to store the id's of cookies clicked
  const clickedCookies = useRef(new Set());

  // state to track mouse moevement
  const [isDrawing, setIsDrawing] = useState(false);

  const handleAnimationFinish = () => {
    
    setTimeout(() => {
        const audioElement2 = new Audio();
        switch (Data.pages[currentPage].cookies.length) {
          case 5:
            audioElement2.src = audioData.circling.total5;
            break;
          case 10:
            audioElement2.src = audioData.circling.total10;
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
              const utterance = `Can Big Bird also have ${Data.pages[currentPage].cookies.length} cookies? Which tray has ${Data.pages[currentPage].cookies.length} cookies? Green or purple?`;
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
    const utterance = `Cookie Monster has ${Data.pages[currentPage].cookies.length} cookies. Let's count together!`;

    setTimeout(() => {
      textToSpeech(utterance, () => {
        setActiveCookieId(1)
      })
    }, 1000);
  }
  };

  // track user inactivity
  const trackInactivity = useCallback(() => {
    setUserInteracted(true);
  }, [[userInteracted]]);
  
// handle case when user does not interact with the page
  useEffect(() => {
    let inactivityTimer;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      setUserInteracted(false);
      inactivityTimer = setTimeout(() => {
        // check if there are cookies on the page and if none have been clicked
        if (Data.pages[currentPage] && Data.pages[currentPage].cookies && Data.pages[currentPage].cookies.length > 0 && clickedCookies.current.size === 0) {
          // get first cookie id and add some animation to it
          const cookieToWiggle = Data.pages[currentPage].cookies[0].id;
          setWigglingCookie(prevstate => ({ ...prevstate, [cookieToWiggle]: true }));
          setTimeout(() => {
            setWigglingCookie(prevstate => ({ ...prevstate, [cookieToWiggle]: false }));
          }, wiggleDuration);
        }
      }, inactivityTimeout);
    };

    // add event listeners to track user activity
    document.addEventListener('click', () => {
      trackInactivity();
      resetInactivityTimer();
    });

    document.addEventListener('touchstart', () => {
      trackInactivity();
      resetInactivityTimer();
    });

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      document.addEventListener('click', resetInactivityTimer);
      document.addEventListener('touchstart', resetInactivityTimer);
    }

  }, [inactivityTimeout, wiggleDuration, activeCookieId, Data.pages, currentPage, trackInactivity]);

  // handle case when user interacts with the page
  useEffect(() => {
    if (userInteracted) {
      const cookieToWiggle = Data.pages[currentPage].cookies[0].id;
      setWigglingCookie(prevstate => ({ ...prevstate, [cookieToWiggle]: false }));
    }
  }, [userInteracted]);


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

  useEffect(() => {
    console.log("Start Animation:", startAnimation);
    
  }, [startAnimation]);

  const message = showMessage
  ? `Can Big Bird also have ${Data.pages[currentPage].cookies.length} cookies? Which tray has ${Data.pages[currentPage].cookies.length} cookies? Green or purple?`
  : `Cookie Monster has ${Data.pages[currentPage].cookies.length} cookies. Let's count together!`;

    
  const handleNextPage = () => {
    if (currentPage < 3) {
      setCookieCount(0)
      setShowTray2(false);
      setShowBigBird(false);
      setShowMessage(false);
      setActiveCookieId(0);
      setshowGrayArea(false);
      setSelectedTray(null);
      setstartAnimation(false);
      setCount(0);
      clickedCookies.current.clear();
      spokenRef.current = false;
      spokenRef2.current = false;
      handleNextClickTouchData(touchData, "Touch", currentPage);
      saveAnswers("touchTest");
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCookieCount(0)
      setShowTray2(false);
      setShowBigBird(false);
      setShowMessage(false);
      setActiveCookieId(0);
      setshowGrayArea(false);
      setSelectedTray(null);
      setstartAnimation(false);
      setCount(0);
      clickedCookies.current.clear();
      spokenRef.current = false;
      spokenRef2.current = false;
    }
  };

  const setModelshow = () =>{
    handleNextClickTouchData(touchData, "Touch", currentPage);
    setModalShow(true)
  }

  const storeAnswer = (answerKey, answerValue) => {
    const storedAnswersJSON = localStorage.getItem('touchTestAnswers');
    const storedAnswersObject = storedAnswersJSON ? JSON.parse(storedAnswersJSON) : {};

    storedAnswersObject[answerKey] = answerValue;
  
    localStorage.setItem('touchTestAnswers', JSON.stringify(storedAnswersObject));
  };

  // handle the click event on the tray
  const handleTrayClick = (trayType) => {
    setSelectedTray(trayType);
    // if the correct tray has been clicked
    if (trayType === "greenTray" && Data.pages[currentPage].greenTray[0].biscuits.length === Data.pages[currentPage].cookies.length) {
      textToSpeech("Green is correct, Good job!");
    }
    else if (trayType === "purpleTray" && Data.pages[currentPage].purpleTray[0].biscuits.length === Data.pages[currentPage].cookies.length){
      textToSpeech("Purple is correct, Well done!");
    }
    // if the wrong tray has been clicked
    else if (trayType === "greenTray" && Data.pages[currentPage].greenTray[0].biscuits.length !== Data.pages[currentPage].cookies.length) {
      const explanation = `No, ${trayType} has ${Data.pages[currentPage].greenTray[0].biscuits.length} cookies. Try again!`;
      textToSpeech(explanation);
    }
    else{
      const explanation = `Wrong answer, ${trayType} has ${Data.pages[currentPage].purpleTray[0].biscuits.length} cookies. Try again!`;
      textToSpeech(explanation);
    }
    storeAnswer(currentPage, trayType);

  };

  // handle the click event on the cookie
  const handleCookieClickWithColor = (cookieId) => {
    const totalCount = Data.pages[currentPage].cookies.length;
    // if the cookie has not been clicked before, add it to the set and increment the count
    for (let i = 0; i <= totalCount; i++) {
      if (!clickedCookies.current.has(cookieId)) {
        // track how many cookies have been clicked
        clickedCookies.current.add(cookieId);
        setCount(prevCount => {
            const newCount = prevCount + 1;
            // real time update of the cookie count
            textToSpeech(`${newCount}`);
            setActiveCookieId(cookieId);
            // if all the cookies have been clicked, show the animation
            if (newCount === totalCount) {
              setActiveCookieId(null);
              setstartAnimation(true);
              const instruction = `Great job! Now draw a circle with your finger by following the yellow line.`;
              setTimeout(() => {
                textToSpeech(instruction, () => {
                })
              }, 1000);
            }
            return newCount;
        });
      }
    }
    
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
            {Data.pages[currentPage].cookies.map((cookie) => (
              <img
                key={cookie.id}
                src={cookie.img}
                id={cookie.id}
                className={`${wigglingCookie[cookie.id] ? "wiggle" : ""} ${clickedCookies.current.has(cookie.id) ? "clickedCookie" : ""}`}
                alt={`Cookie ${cookie.id}`}
                onClick={() => handleCookieClickWithColor(cookie.id)}
                style={{
                  position: "absolute",
                  top: cookie.top,
                  left: cookie.left,
                }}
              />
            ))}
          </div>
          {startAnimation && (
            <div className="anim">
              <Animation onAnimationFinish={handleAnimationFinish}/>
            </div>)}
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
              {Data.pages[currentPage].greenTray[0].biscuits.map((biscuit) => (
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
              <div className="purpleBiscuits position-absolute">
              {Data.pages[currentPage].purpleTray[0].biscuits.map((biscuit) => (
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
                ? (<button onClick={handlePreviousPage}><Link to={`/game/touch/play/${currentPage - 1}`}><ArrowBackIosIcon /></Link></button>) 
                : (<button disabled> <ArrowBackIosIcon /></button>)}
              {currentPage < 3 
                ?  ( <button onClick={handleNextPage}><Link to={`/game/touch/play/${currentPage + 1}`}><ArrowForwardIosIcon /></Link></button>) 
                : (<button onClick={setModelshow}> <ArrowForwardIosIcon /></button>)}
                  <DialogBox show={modalShow} onHide={() => setModalShow(false)} page="practice"/>
          </div>
      </div>
      <div><button className="homeLogo"><Link to={`/game/home/${selectedOption}`}><HomeRoundedIcon /></Link></button></div>
      </div>
  );
};

export default gamePage;
