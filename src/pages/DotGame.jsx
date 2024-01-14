import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./DotGame.css";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
function DotGame() {
  const firebaseConfig = {
    apiKey: "AIzaSyD0YPFk2JTtrT8HG8uGb8s2V1AfI4P7-dA",
    authDomain: "lhdemo-4d7dd.firebaseapp.com",
    projectId: "lhdemo-4d7dd",
    storageBucket: "lhdemo-4d7dd.appspot.com",
    messagingSenderId: "41015206470",
    appId: "1:41015206470:web:19c26d967ca4d4bb376047",
    measurementId: "G-ZHQ55X16NC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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
    } else if (isStart == true && timeLeft == 0) {
      setIsStart(false);
      const randomReward = (Math.random() * (5 - 0.1) + 0.1).toFixed(2);
      Swal.fire({
        title: "รางวัล",
        text: `ว่าคุณโชคดีจังเลย! , คุณได้ ${score} คะแนน และ ได้ ${randomReward} เหรียญ`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "ต่อไป",
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
    logEvent(analytics, "start-dot-game")
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
      <h1>เกมกดจุด</h1>
      <p></p>
      <p>เวลาที่เหลือ: {timeLeft} วินาที</p>
      <div className="container">
        {isStart && (
          <div
            className="dot"
            style={{ left: `${dotPosition.x}px`, top: `${dotPosition.y}px` }}
            onClick={handleDotClick}
          ></div>
        )}
      </div>
      {/* {timeLeft === 0 && <p>Score: {score}</p>} */}
      <div className="button-dot" onClick={startGame}>
            <p className="button-text">เริ่มเล่น</p>
      </div>
    </>
  );
}
export default DotGame;
