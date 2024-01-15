import React,{ useState, useEffect, useRef }  from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "../styles/practice.css";
import practiceData from '../data/practiceData';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import {handleInteraction, handleNextClickPractice} from '../helpers/imageTouchData';

function practice() {
    const { page } = useParams();
    const currentPage = parseInt(page);
    const [touchData, setTouchData] = useState([]);
    const once = useRef(false);


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

    const handleNextButton = () => {
      handleNextClickPractice(touchData);
      
    };
   
    return (
        <div>
          <div>
              {practiceData.pages[currentPage].animals.map((animal) => (
                <img
                  key={animal.id}
                  src={animal.img}
                  id={animal.id}
                  alt={animal.name}
                  style={{
                    position: "absolute",
                    top: animal.top,
                    left: animal.left,
                    height: animal.height,
                  }}
                />
              )) }
          </div>
          <div className="buttons">
              {currentPage > 0 
                ? (<button><Link to={`/game/practice/${currentPage - 1}`}><ArrowBackIosIcon /></Link></button>) 
                : (<button disabled> <ArrowBackIosIcon /></button>)}
              {currentPage < 21 
                ?  ( <button onClick={handleNextButton}><Link to={`/game/practice/${currentPage + 1}`}><ArrowForwardIosIcon /></Link></button>) 
                : (<button onClick={handleNextButton}> <Link to="/game/home"><ArrowForwardIosIcon /></Link></button>)}
          </div>

          <div><button className="homeLogo"><Link to={`/game/home`}><HomeRoundedIcon /></Link></button></div>
        </div>
  )
}

export default practice;
