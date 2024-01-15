import React from "react";
import {useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import baseData from  "../data/baseData.js";
import Tray1 from "../assests/TrayB.png";
import BigBird from "../assests/BigBird.png";
import greenTray from "../assests/greenTray.png";
import purpleTray from "../assests/purpleTray.png"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DialogBox from "../components/dialogBox";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import {handleInteraction, handleNextClickTouchData} from '../helpers/imageTouchData';

function basePage() {
    const { page } = useParams();
    const currentPage = parseInt(page);
    const messageRef = useRef(false);
    const [modalShow, setModalShow] = useState(false);
    const [touchData, setTouchData] = useState([]);
    const [selectedTray, setSelectedTray] = useState(null);
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

      const storeAnswer = (answerKey, answerValue) => {
        const storedAnswersJSON = localStorage.getItem('baselineCategoryAnswers');
        const storedAnswersObject = storedAnswersJSON ? JSON.parse(storedAnswersJSON) : {};
    
        storedAnswersObject[answerKey] = answerValue;
      
        localStorage.setItem('baselineCategoryAnswers', JSON.stringify(storedAnswersObject));
      };
    
      const handleTrayClick = (trayType) => {
        setSelectedTray(trayType);
        storeAnswer(currentPage, trayType);
      };

      const handleNextPage = () => {
        if (currentPage < 3) {
          messageRef.current = false;
          handleNextClickTouchData(touchData, "Baseline", currentPage);
          setSelectedTray(null);
        }
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 0) {
          messageRef.current = false;
          setSelectedTray(null);
        }
      };


      const setModelshow = () =>{
        handleNextClickTouchData(touchData, "Baseline", currentPage);
        setModalShow(true)
      }



  return (
    <div className='container'>
    <div className="row">
      <div className="col-2  cookiecol">
        <div className="background-container">
          <img src={Tray1} alt="tray1" className="tray1" />
        </div>
        <div className="card">
          <div className="card-body">
            {baseData.pages[currentPage].message}
          </div>
        </div>
        <div className="cookieContainer position-absolute">
          {baseData.pages[currentPage].cookies.length > 0 ? (
            baseData.pages[currentPage].cookies.map((cookie) => (
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
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div className="col-8 position-absolute tray-container">
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
              {baseData.pages[currentPage].greenTray[0].biscuits.map((biscuit) => (
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
              {baseData.pages[currentPage].purpleTray[0].biscuits.map((biscuit) => (
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
        <img
          src={BigBird}
          className="bigBird"
          id="bigBird"
          key="bigBird"
          alt="bigbird"
        />
      </div>

      <div className="buttons">
        {currentPage > 0 ? (
          <button onClick={handlePreviousPage}>
            <Link to={`/game/base/${currentPage - 1}`}>
              <ArrowBackIosIcon />
            </Link>
          </button>
        ) : (
          <button disabled>
            {" "}
            <ArrowBackIosIcon />
          </button>
        )}
        {currentPage < 3 ? (
          <button onClick={handleNextPage}>
            <Link to={`/game/base/${currentPage + 1}`}>
              <ArrowForwardIosIcon />
            </Link>
          </button>
        ) : (
          <button onClick={setModelshow}>
            {" "}
            <ArrowForwardIosIcon />
          </button>
        )}
        <DialogBox
          show={modalShow}
          onHide={() => setModalShow(false)}
          page="play"
        />
      </div>
      <div>
        <button className="homeLogo">
          <Link to={`/game/home`}>
            <HomeRoundedIcon />
          </Link>
        </button>
      </div>
    </div>
    </div>
  );
}

export default basePage;
