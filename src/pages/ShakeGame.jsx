// import './pages/Pages.css'
import { useState, useEffect,Suspense } from "react";
import '../pages/ShakeGame.css'
import '../pages/Pages.css'
import Swal from 'sweetalert2'
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Ball from "../models/Ball"
import { OrbitControls , Stars } from "@react-three/drei";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
function ShakeGame() {
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
    const [countdownTime, setCountdownTime] = useState(5);
    const percentage = (15 - countdownTime) / 15 * 100
    const [coins,setCoins] = useState(0);
  
    useEffect(() => {
        // const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(
        //   75,
        //   300 / 300,
        //   1,
        //   1000
        // );
        // camera.position.z = 96;
        // // scene.background = new THREE.Color(0x000000); // Black color
        // // scene.background.a = 0.5; // Set alpha (transparency) to 0.5
        // const canvasContainer = document.getElementById('myCanvasContainer');
        // const canvas = document.getElementById('myThreeJsCanvas');;
        // const renderer = new THREE.WebGL1Renderer({
        //   canvas,
        //   antialias:true,
        //   alpha: true,
        // });
        // renderer.setPixelRatio(window.devicePixelRatio);
        // const containerWidth = canvasContainer.clientWidth;
        // const containerHeight = canvasContainer.clientHeight;
    
        // renderer.setSize(containerWidth, containerHeight);
        
        // canvasContainer.appendChild(renderer.domElement);

        // const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
        // scene.add(ambientLight)

        // // const boxGemoetry = new THREE.BoxGeometry(60,60,60);
        // // const boxMaterial = new THREE.MeshNormalMaterial();
        // // const boxMesh = new THREE.Mesh(boxGemoetry,boxMaterial);
        // // scene.add(boxMesh);
        // const loader = new GLTFLoader();
        // loader.load(
        //   // Replace 'path/to/your/model.gltf' with the actual path to your GLTF model
        //   'src/assets/models/gacha.gltf',
        //   (gltf) => {
        //     // Adjust the position, scale, or rotation as needed
        //     const model = gltf.scene;
        //     model.scale.set(1, 1, 1);
        //     model.rotation.set(0, 0, 0);
        //     model.position.set(0, 0, 0);
    
        //     // Add the model to the scene
        //     scene.add(model);
        //   },
        //   undefined,
        //   (error) => {
        //     console.error('Error loading GLTF model', error);
        //   }
        // );

        // const animate = () => {
        //   boxMesh.rotation.x += 0.01;
        //   boxMesh.rotation.y += 0.01;
        //   renderer.render(scene,camera);
        //   window.requestAnimationFrame(animate);
        // };

        // animate();
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
                  const randomReward = (Math.random() * (5 - 0.1) + 0.1).toFixed(2);
                  Swal.fire({
                    title: "รางวัล",
                    text: `ว่าคุณโชคดีจังเลย! , คุณได้ ${randomReward} เหรียญ`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "ต่อไป",
                  }).then((result) => {
                      if (result.isConfirmed) {
                       
                      }
                    });
                }
                else{
                  Swal.fire({
                    title: "เตือน",
                    text: `กรุณาเขย่าขณะกดเริ่ม`,
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "ต่อไป",
                  }).then((result) => {
                      if (result.isConfirmed) {
                       
                      }
                    });
                }
                return 5;
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
        setIsSensorActive((prevIsSensorActive) => !prevIsSensorActive);
        logEvent(analytics, "start-shake-game")
      };

    return (
        <>
        <h1>เกมเขย่า</h1>
        <p>กดเรื่มแล้วเขย่าได้เลย</p>
              {/* <div className="gacha-ball"> */}
        {/* {coins.map((coin, index) => (
          <div key={index} className={`coin ${coin ? 'falling' : 'staying'}`} />
        ))} */}
      {/* </div> */}

      {/* <div id="myCanvasContainer" style={{ position: 'relative', width: '300px', height: '300px', marginTop:'50px',marginBottom:'50px'}}>
            <canvas id="myThreeJsCanvas" style={{ position: 'absolute', top: '0', left: '0' }} />
        </div> */}

      <Canvas>

            {/* <OrbitControls enableZoom={false}/> */}
        <Suspense fallback={null}>
        <ambientLight intensity={2}/>
        <pointLight position={[0, 0, 0]} intensity={1} color="white" />
            <Ball scale={[0.6,0.6,0.6]}/>
        </Suspense>
      </Canvas>
      {/* <Canvas>
          <Gacha />
      </Canvas> */}
       <div className="button-dot" onClick={toggleSensor}>
        {isSensorActive ? (
            <p className="button-text">กำลังเล่น</p>
          ) : (
            <p className="button-text">เริ่มเล่น</p>
          )}
      </div>
      {/* <button onClick={toggleSensor}>เริ่มเล่น</button> */}
        </>

    );
  };
export default ShakeGame;
