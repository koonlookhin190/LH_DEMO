import React, { useState, useRef, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
// import { ref, uploadString, getDownloadURL } from 'firebase/storage';
// import { storage } from './firebase';

import './Canvas.css';

const DrawingComponent = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penSize, setPenSize] = useState(12);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [timerReset, setTimerReset] = useState(false);
  var timer;

  const firebaseConfig = {
    apiKey: "AIzaSyD0YPFk2JTtrT8HG8uGb8s2V1AfI4P7-dA",
    authDomain: "lhdemo-4d7dd.firebaseapp.com",
    projectId: "lhdemo-4d7dd",
    storageBucket: "lhdemo-4d7dd.appspot.com",
    messagingSenderId: "41015206470",
    appId: "1:41015206470:web:19c26d967ca4d4bb376047",
    measurementId: "G-ZHQ55X16NC",
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.strokeStyle = 'black';
    context.lineWidth = penSize;
    context.lineCap = 'round';

    timer = setInterval(() => {
      setMilliseconds((prevMilliseconds) => {
        if (prevMilliseconds === 900) {
          setSeconds((prevSeconds) => {
            return prevSeconds + 1;
          });
          if (seconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            setSeconds(0);
          }
          return 0;
        }
        return prevMilliseconds + 100;
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [isDrawing, penSize, seconds, minutes, timerReset]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    logCoordinates(e);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    context.beginPath();
    context.moveTo(getX(e, rect), getY(e, rect));
  };

  const draw = (e) => {
    if (!isDrawing) return;

    logCoordinates(e);

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'source-over';
    context.lineWidth = penSize;

    const rect = canvas.getBoundingClientRect();
    context.lineTo(getX(e, rect), getY(e, rect));
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'source-over';
    context.lineWidth = penSize;
  };

  const getX = (event, rect) => {
    return (
      (event.clientX - rect.left) ||
      (event.touches && event.touches.length > 0 && event.touches[0].clientX - rect.left) ||
      0
    );
  };

  const getY = (event, rect) => {
    return (
      (event.clientY - rect.top) ||
      (event.touches && event.touches.length > 0 && event.touches[0].clientY - rect.top) ||
      0
    );
  };

  const logCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = getX(event, rect);
    const y = getY(event, rect);

    // Format milliseconds, seconds, and minutes
    const formattedMilliseconds = milliseconds < 10 ? `00${milliseconds}` : (milliseconds < 100 ? `0${milliseconds}` : milliseconds);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    console.log(`Current Coordinates: (${x}, ${y}), Timer: ${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
    setTimerReset(!timerReset);
  };

  const saveImageToLocal = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    const image = canvas.toDataURL('image/png');
    link.href = image;
    link.download = 'canvas.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmSendImage = () => {
   
    logEvent(analytics, 'user_press_send_image_button');

    
    alert('ขอบคุณที่ส่งรูป!');
  };

  const uploadImageToStorage = async () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
  
  };

  return (
    <div className="drawing-container">
      <h1>เกมวาดรูป</h1>
      <div className="tool-navbar">
        <button onClick={clearCanvas}>เริ่มใหม่</button>
        <button onClick={saveImageToLocal} download="canvas.png">ดาวโหลด</button>
        <button onClick={confirmSendImage}>กดส่งรูป</button>
      
      </div>
      
      <div className="canvas-wrapper">
        <canvas 
          ref={canvasRef}
          width={300}
          height={500}
          className="canvas"
          onMouseDown={startDrawing}
          onTouchStart={startDrawing}
          onMouseMove={draw}
          onTouchMove={draw}
          onMouseUp={stopDrawing}
          onTouchEnd={stopDrawing}
        />
      </div>
    </div>
  );
};

export default DrawingComponent;
