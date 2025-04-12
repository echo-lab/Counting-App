import React, { useRef, useState } from 'react';
import { textToSpeech } from '../helpers/textToSpeech';

function Canvas({ onAnimationFinish }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [circlePath, setCirclePath] = useState([]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // handle both touch and mouse events
    const { clientX, clientY } = e.touches ? e.touches[0]: e;
    const { left, top } = canvas.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    context.beginPath();
    context.moveTo(x, y);
    setCirclePath([{x, y}]); // Store the starting point of the circle
  };

  const draw = (e) => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      // handle both touch and mouse events
      const { clientX, clientY } = e.touches ? e.touches[0]: e;
      const { left, top } = canvas.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;
      context.strokeStyle = '#0FF0FC';
      context.lineWidth = 20;
      context.lineTo(x, y);
      context.stroke();
      setCirclePath((prevPath) => [...prevPath, {x, y}]); // Store the path of the circle
    }
  };

  
    
    const isCircle = () => {
      if (circlePath.length < 10) {
        console.log('Too few points to form a circle');
        return false; // Not enough points to form a circle
      }
    
      const start = circlePath[0];
      const end = circlePath[circlePath.length - 1];
    
      // Check if the start and end points are close enough
      const distance = Math.sqrt((start.x - end.x) ** 2 + (start.y - end.y) ** 2);
      console.log('Start-End Distance:', distance);
      if (distance > 20) { // Adjust the threshold as needed
        console.log('Start and end points are too far apart');
        return false;
      }
    
      // Calculate the center of the path
      const centerX = (Math.min(...circlePath.map((p) => p.x)) + Math.max(...circlePath.map((p) => p.x))) / 2;
      const centerY = (Math.min(...circlePath.map((p) => p.y)) + Math.max(...circlePath.map((p) => p.y))) / 2;
      console.log('Center:', { centerX, centerY });
    
      // Check if all points are roughly equidistant from the center
      const radii = circlePath.map((p) => Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2));
      const avgRadius = radii.reduce((sum, r) => sum + r, 0) / radii.length;
      const radiusVariance = radii.reduce((sum, r) => sum + Math.abs(r - avgRadius), 0) / radii.length;
      console.log('Average Radius:', avgRadius, 'Radius Variance:', radiusVariance);
    
      return radiusVariance < 15; // Adjust the threshold as needed
    };
  
  const stopDrawing = () => {
    setIsDrawing(false);
    // display animation finish if user draws a circle
    console.log('Circle Path:', circlePath); // Log the path for debugging
    
    if (isCircle()) {
      onAnimationFinish(); // Call the provided callback function when the animation finishes
      console.log('Animation finished');
    }
    else{
      // Give feed back to the user
      textToSpeech('Please draw a circle');
      // Clear the canvas if the drawing is not a circle
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height); 
    }
    
  };

  return (
    <canvas
      ref={canvasRef}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      onMouseDown={startDrawing} // Add mouse event for starting the drawing
      onMouseMove={draw} // Add mouse event for drawing
      onMouseUp={stopDrawing} // Add mouse event for stopping the drawing
      onMouseLeave={stopDrawing} // Stop drawing if the mouse leaves the canvas
      width={600}
      height={600}
      style={{
        position: 'relative',
        //border: '1px dotted black',
        cursor: 'pointer',
        background: 'transparent',
      }}
    ></canvas>
  );
}

function CircleDraw({ onAnimationFinish }) {
  return (
    <div>
      <Canvas onAnimationFinish={onAnimationFinish} />
    </div>
  );
}

export default CircleDraw;
