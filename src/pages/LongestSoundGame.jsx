import React, { useState, useRef, useEffect } from "react";
import { SpriteAnimator } from "react-sprite-animator";
import texts from "./LongestSoundText.js";
import "./RepeatGame.css";
import { Link } from "react-router-dom";

import img1 from "./assets/stand.png";
import img2 from "./assets/Megaman2.png";
import tutorial1 from "./assets/tutorial_long_1.png";
import tutorial2 from "./assets/tutorial_long_2.png";
import tutorial3 from "./assets/tutorial_long_3.png";
import tutorial4 from "./assets/tutorial_long_4.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMicrophone,
//   faPlay,
//   faStop,
// } from "@fortawesome/free-solid-svg-icons";

import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const LongestSoundGame = () => {
  const [permission, setPermission] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [randomText, setRandomText] = useState("");
  const mimeType = "audio/wav";
  const [imageStyle, setImageStyle] = useState({});
  const [animateSprite, setAnimateSprite] = useState(false);
  const [timer, setTimer] = useState(15);

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
    setRandomText(getRandomText());
  }, []);

  useEffect(() => {
    if (permission && recordingStatus === "inactive") {
      setRandomText(getRandomText());
    }
  }, [permission, recordingStatus]);

  const getRandomText = () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
  };

  const getMicrophonePermission = async () => {
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setPermission(true);
      setStream(streamData);
      startRecording(streamData);
      setAnimateSprite(true); // Activate sprite animation
    } catch (err) {
      console.error(err);

      if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError"
      ) {
        alert(
          "Error: Microphone permission denied. Please enable microphone access in your browser settings."
        );
      } else {
        alert(
          "Error: Unable to access the microphone. Please check your browser settings."
        );
      }
    }
    setRandomText(getRandomText());
  };

  const startRecording = (streamData) => {
    setRecordingStatus("recording");
    setTimer(15);
    const media = new MediaRecorder(streamData, { type: mimeType });
    mediaRecorder.current = media;
    let localAudioChunks = [];

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer - 1;
        if (newTimer === 0) {
          clearInterval(timerInterval);
          stopRecording();
        }
        return newTimer;
      });
    }, 1000);

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
      const newPosition = localAudioChunks.length * 2;
      setImageStyle({ transform: `translateX(${newPosition}px)` });
    };

    const timerId = setTimeout(() => {
      stopRecording();
    }, 15000);
    mediaRecorder.current.onstop = () => {
      clearTimeout(timerId);
      clearInterval(timerInterval);
      const audioBlob = new Blob(localAudioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
    mediaRecorder.current.start();
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % tutorialImages.length);
  };

  const closeTutorial = () => {
    setShowTutorial(false);
  };

  const tutorialImages = [tutorial1, tutorial2, tutorial3, tutorial4];

  return (
    <div className="background-img-longest">
      {/* {showTutorial && (
        <div className="fullscreen-overlay">
          <div className="tutorial-slider">
            {tutorialImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Tutorial ${index + 1}`}
                style={{
                  display: index === currentSlide ? "block" : "none",
                }}
              />
            ))}
            {currentSlide < tutorialImages.length - 1 && (
              <button onClick={nextSlide}>ต่อไป</button>
            )}
            <button onClick={closeTutorial}>ปิดหน้าต่างนี้</button>
          </div>
        </div>
      )} */}
      <h1 className="text">เกมลากเสียง</h1>
      <div className="speech-bubble">
        <h2>{'"' + randomText + '"'}</h2>
      </div>
      {animateSprite && timer > 0 ? (
        <div className="sprite-animator-container">
          <SpriteAnimator
            width={270}
            height={227}
            sprite={img2}
            shouldAnimate={true}
            direction="horizontal"
            frameCount={5}
            fps={14}
          />
        </div>
      ) : (
        <img
          src={img1}
          alt="Speech Image"
          className="speech-image"
          style={imageStyle}
        />
      )}
      <main>
        <div>
          <h3>เวลาที่เหลือ: {timer} วินาที</h3>
        </div>
        <div className="audio-controls">
          {!permission ? (
            <button
              onClick={() => {
                getMicrophonePermission();
                logEvent(analytics, "get_microphone");
              }}
              type="button"
              className="custom-button"
            >
              {/* <FontAwesomeIcon icon={faMicrophone} size="2x" /> */}
              <p>กดที่นี่เพื่อทดสอบ</p>
            </button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <button
              onClick={() => {
                startRecording(stream);
                logEvent(analytics, "play_sound_button");
                setAnimateSprite(true); // Activate sprite animation
              }}
              type="button"
              className="custom-button"
            >
              {/* <FontAwesomeIcon icon={faPlay} size="2x" /> */}
              <p>ลองอีกครั้ง</p>
            </button>
          ) : null}
          {permission && recordingStatus === "recording" ? (
            <button
              onClick={() => {
                stopRecording();
                logEvent(analytics, "stop_sound_button");
                setAnimateSprite(false); // Deactivate sprite animation
              }}
              type="button"
              className="custom-button recording"
            >
              {/* <FontAwesomeIcon icon={faStop} size="2x" /> */}
              <h2>หยุด</h2>
            </button>
          ) : null}
        </div>
        <div className="sound-padding">
          {audio && <audio controls src={audio} />}
        </div>
        {permission && recordingStatus === "inactive" ? (
          <div>
            <h3>คุณได้รับ 5 คะแนน, ขอบคุณที่ร่วมสนุกกับเรา</h3>
            <Link to="/">
              <button onClick={() => logEvent(analytics, "finish_home")}>
                เสร็จสิ้น
              </button>
            </Link>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default LongestSoundGame;
