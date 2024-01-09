// import './pages/Pages.css'
import { useState, useEffect } from "react";
import '../pages/ShakeGame.css'
import Swal from 'sweetalert2'
function ShakeGame() {
    // const [coins, setCoins] = useState(Array(10).fill(true));

    // useEffect(() => {
    //     const handleGravity = () => {
    //         setCoins((prevCoins) => {
    //           // Check if the bottom coin has reached the bottom of the ball
    //           if (!prevCoins[0]) {
    //             return prevCoins;
    //           }
          
    //           // Check if the bottom coin is already at the bottom
    //           if (prevCoins[0] && prevCoins.slice(1).every((coin) => coin === false)) {
    //             return prevCoins;
    //           }
          
    //           // Apply gravity to move coins down
    //           const newCoins = prevCoins.map((coin, index) =>
    //             index === 0 ? true : prevCoins[index - 1]
    //           );
          
    //           return newCoins;
    //         });
    //       };
  
    //   const gravityInterval = setInterval(() => {
    //     handleGravity();
    //   }, 500);
  
    //   // Clean up the interval when the component is unmounted
    //   return () => clearInterval(gravityInterval);
    // }, []);
    const [isSensorActive, setIsSensorActive] = useState(false);
    const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
    const [gyroscope, setGyroscope] = useState({ alpha: 0, beta: 0, gamma: 0 });
    // const [holdTimeout, setHoldTimeout] = useState(null);\
    const [countdownTime, setCountdownTime] = useState(15);
    const percentage = (15 - countdownTime) / 15 * 100
    const [coins,setCoins] = useState(0);
  
    useEffect(() => {
        let sensorEventListener;
        let countdownInterval;
        let isShaking
        const startSensor = () => {
          sensorEventListener = (event) => {
            if (event.rotationRate instanceof DeviceMotionEventRotationRate) {
              setGyroscope({
                alpha: event.rotationRate.alpha.toFixed(2),
                beta: event.rotationRate.beta.toFixed(2),
                gamma: event.rotationRate.gamma.toFixed(2),
              });
            }
            if (
              event.accelerationIncludingGravity instanceof
              DeviceMotionEventAcceleration
            ) {
              console.log("Asscelor");
              setAcceleration({
                x: event.accelerationIncludingGravity.x.toFixed(2),
                y: event.accelerationIncludingGravity.y.toFixed(2),
                z: event.accelerationIncludingGravity.z.toFixed(2),
              });
            }
            const shakeThreshold = 15;
            isShaking =
              Math.abs(event.accelerationIncludingGravity.x) > shakeThreshold ||
              Math.abs(event.accelerationIncludingGravity.y) > shakeThreshold ||
              Math.abs(event.accelerationIncludingGravity.z) > shakeThreshold;
    
          };
    
          window.addEventListener("devicemotion", sensorEventListener);
    
          countdownInterval = setInterval(() => {
            setCountdownTime((prevTime) => {
              if (prevTime === 1) {
                clearInterval(countdownInterval);
                setIsSensorActive(false);
               
                if (isShaking && prevTime===1) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Do you want to continue',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                      })
                }
                else{
                  showNotification('good you not shaking.');
                }
                return 15;
              } else {
                return prevTime - 1;
              }
            });
          }, 1000);
        //   logEvent(analytics,'sensor_started');
        };
    
        const stopSensor = () => {
          window.removeEventListener("devicemotion", sensorEventListener);
          clearInterval(countdownInterval);
        //   logEvent(analytics,'sensor_stoped');
        };
    
        if (isSensorActive) {
          startSensor();
        } else {
          stopSensor();
        }
        return () => {
          stopSensor();
        };
      }, [isSensorActive]);
      const toggleSensor = () => {
        // setIsSensorActive((prevIsSensorActive) => !prevIsSensorActive);
        const randomReward = (Math.random() * (5 - 0.1) + 0.1).toFixed(2);
        Swal.fire({
            title: "Reward",
            text: `How lucky you are! You got ${randomReward} coins.`,
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Continue"
          }).then((result) => {
            if (result.isConfirmed) {
             
            }
          });
      };
    return (
        <>
        <h3>Shake Game</h3>
              <div className="gacha-ball">
        {/* {coins.map((coin, index) => (
          <div key={index} className={`coin ${coin ? 'falling' : 'staying'}`} />
        ))} */}
      </div>
      <button onClick={toggleSensor}>Start</button>
        </>

    );
  };
export default ShakeGame;
