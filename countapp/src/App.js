import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home';
import GamePage from './pages/gamepage';
import AnimationPage from './pages/animationpage'
import TrainPage from './pages/training';
import PracticePage from './pages/practice';
import SignupPage from './pages/signupPage';
import BasePage from './pages/basePage';
import BaseTrainingPage from './pages/baseTraining';
import AnimationTrainingPage from './pages/animationTrainingPage';
import TouchTrainingPage from './pages/TouchTrainingPage';
import { SoundProvider } from './helpers/SoundContext';
import { AppDataProvider } from './context/Context.js';
import './App.css';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div className="App">
      <SoundProvider>
      <AppDataProvider>
      <Router>
        <Routes>
          <Route path='/' element={isLoggedIn == "true"? <Home /> : <SignupPage />}/>
          <Route path='/game/home' element={<Home />}/>
          <Route path='/game/play/:page' element={<GamePage />}/>
          <Route path='/game/animation/play/:page' element={<AnimationPage />}/>
          <Route path='/game/train/:page' element={<TrainPage />}/>
          <Route path='/game/practice/:page' element={<PracticePage />}/>
          <Route path='/game/base/:page' element={<BasePage />}/>
          <Route path='/game/base/training/:page' element={<BaseTrainingPage />}/>
          <Route path='/game/animation/training/:page' element={<AnimationTrainingPage />}/>
          <Route path='/game/touch/training/:page' element={<TouchTrainingPage />}/>
        </Routes>
     </Router>
     </AppDataProvider>
     </SoundProvider>
    </div>
  );
}

export default App;
