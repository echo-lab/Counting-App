import React from 'react';
import {  Link } from 'react-router-dom';
import { useAppData } from '../context/Context';
import '../styles/selectorpage.css';

function SelectorPage() {
  const { setSelectedOption } = useAppData();

  return (
    <div className="selector">
        <div className="selector-buttons">
          <Link to="/game/home/A" className="selector-button" onClick={() => setSelectedOption('A')}>A</Link>
          <Link to="/game/home/B" className="selector-button" onClick={() => setSelectedOption('B')}>B</Link>
        </div>
      </div>
  )
}

export default SelectorPage
