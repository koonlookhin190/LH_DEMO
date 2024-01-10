import React, { useState, useRef, useEffect } from 'react';
import './Canvas.css';

const DrawingComponent = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penSize, setPenSize] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  var timer;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.strokeStyle = 'black';
    context.lineWidth = penSize;
    context.lineCap = 'round';

    timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
      if (seconds === 59) {
        setMinutes((prevMinutes) => prevMinutes + 1);
        setSeconds(0);
      }
    }, 1000);

    const startDrawing = (e) => {
      setIsDrawing(true);
      context.beginPath();
      context.moveTo(getX(e), getY(e));
    };

    const draw = (e) => {
      if (!isDrawing) return;

      context.globalCompositeOperation = 'source-over';
      context.lineWidth = penSize;

      context.lineTo(getX(e), getY(e));
      context.stroke();
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      context.globalCompositeOperation = 'source-over';
      context.lineWidth = penSize;
    };

    const getX = (event) => {
      return event.clientX
        ? event.clientX - canvas.getBoundingClientRect().left
        : event.touches[0].clientX - canvas.getBoundingClientRect().left;
    };

    const getY = (event) => {
      return event.clientY
        ? event.clientY - canvas.getBoundingClientRect().top
        : event.touches[0].clientY - canvas.getBoundingClientRect().top;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('touchstart', startDrawing);

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', draw);

    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      clearInterval(timer);

      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('touchstart', startDrawing);

      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('touchmove', draw);

      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawing, penSize, seconds, minutes]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
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

  const uploadImageToStorage = async () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const storageRef = ref(storage, 'images');

    try {
      const imageName = `drawn_image_${Date.now()}.png`;
      const imageRef = ref(storageRef, imageName);
      await uploadString(imageRef, image, 'data_url');
      const imageUrl = await getDownloadURL(imageRef);
      console.log('Image uploaded successfully. URL:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="drawing-container">
      <h1>Drawing</h1>
      <div className="tool-navbar">
        <button onClick={clearCanvas}>Clear</button>
        <button id="download_image_link" onClick={saveImageToLocal} download="canvas.png">Download</button>
        <button onClick={uploadImageToStorage}>Upload</button>
      </div>
      <div>
        <h1>{minutes}:{seconds}</h1>
      </div>

      <canvas
        ref={canvasRef}
        width={window.innerWidth - 20}
        height={window.innerHeight * 0.6}
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};

export default DrawingComponent;
