import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import "./DotGame.css";
function DotGame() {
    const containerSize = 300;
    const dotSize = 100;
    
    const [dotPosition, setDotPosition] = useState({ x: 50, y: 50 });
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isStart, setIsStart] = useState(false);
  
    useEffect(() => {
      let timer;
      if (timeLeft > 0 && isStart) {
        timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      }else if (isStart==true&&timeLeft==0){
        setIsStart(false)
        const randomReward = (Math.random() * (5 - 0.1) + 0.1).toFixed(2);
        Swal.fire({
            title: "Reward",
            text: `How lucky you are! , you have ${score} scores and You got ${randomReward} coins.`,
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Continue"
          }).then((result) => {
            if (result.isConfirmed) {
             
            }
          });
      }
  
      return () => clearInterval(timer);
    }, [timeLeft, isStart]);
  
    const handleDotClick = () => {
      if (isStart) {
        setScore((prevScore) => prevScore + 1);
        setDotPosition({
          x: Math.random() * (containerSize - dotSize),
          y: Math.random() * (containerSize - dotSize),
        });
      }
    };
  
    const startGame = () => {
      setIsStart(true);
      setScore(0);
      setTimeLeft(10);
      setDotPosition({
        x: Math.random() * (containerSize - dotSize),
        y: Math.random() * (containerSize - dotSize),
      });
    };
    return (
        <>
            <h1>Tap Dot Game</h1>
            <p></p>
            <p>Time Left: {timeLeft} seconds</p>
            <div className="container">
                {isStart && <div
                    className="dot"
                    style={{ left: `${dotPosition.x}px`, top: `${dotPosition.y}px` }}
                    onClick={handleDotClick}
                ></div>}
            </div>
            {/* {timeLeft === 0 && <p>Score: {score}</p>} */}
            <button onClick={startGame}>Start</button>
        </>
    );
}
export default DotGame;