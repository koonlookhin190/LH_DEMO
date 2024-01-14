import React, { useState, useRef, useEffect } from "react";
import { SpriteAnimator } from "react-sprite-animator";
import texts from "./LongestSoundText.js";
import "./RepeatGame.css";

import img1 from "./assets/stand.png";
import img2 from "./assets/Megaman2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faPlay,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

const LongestSoundGame = () => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [randomText, setRandomText] = useState("");
  const mimeType = "audio/wav";
  const [imageStyle, setImageStyle] = useState({});
  const [animateSprite, setAnimateSprite] = useState(false);

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
    const media = new MediaRecorder(streamData, { type: mimeType });
    mediaRecorder.current = media;
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
      const newPosition = localAudioChunks.length * 2;
      setImageStyle({ transform: `translateX(${newPosition}px)` });
    };
    mediaRecorder.current.onstop = () => {
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

  return (
    <div className="background-img-longest">
      <h1 className="text">เกมลากเสียง</h1>
      <div className="speech-bubble">
        <h2>{'"' + randomText + '"'}</h2>
      </div>
      {animateSprite ? (
        <div className="sprite-animator-container">
        <SpriteAnimator
          width={270}
          height={227}
          sprite={img2}
          shouldAnimate={true}
          direction="horizontal"
          frameCount={5}
          fps={10}
        />
        </div>
      ) : (
        <img src={img1} alt="Speech Image" className="speech-image" style={imageStyle} />
      )}
      <main>
        <div className="audio-controls">
          {!permission ? (
            <button
              onClick={() => {
                getMicrophonePermission();
              }}
              type="button"
              className="custom-button"
            >
              <FontAwesomeIcon icon={faMicrophone} size="2x" />
            </button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <button
              onClick={() => {
                startRecording(stream);
                setAnimateSprite(true); // Activate sprite animation
              }}
              type="button"
              className="custom-button"
            >
              <FontAwesomeIcon icon={faPlay} size="2x" />
            </button>
          ) : null}
          {permission && recordingStatus === "recording" ? (
            <button
              onClick={() => {
                stopRecording();
                setAnimateSprite(false); // Deactivate sprite animation
              }}
              type="button"
              className="custom-button recording"
            >
              <FontAwesomeIcon icon={faStop} size="2x" />
            </button>
          ) : null}
        </div>
        <div>{audio && <audio controls src={audio} />}</div>
      </main>
    </div>
  );
};

export default LongestSoundGame;