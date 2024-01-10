import { useState, useRef, useEffect } from "react";
import './Pages.css'
import texts from "./Text.js";
import "./RepeatGame.css";

import img1 from "./assets/stand.png"
import img2 from "./assets/speak.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

const RepeatGame = () => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [randomText, setRandomText] = useState("");
  const mimeType = "audio/wav"; // You can change this to the desired audio format
  const [imageSrc, setImageSrc] = useState(img1);

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
  };

  const startRecording = (streamData) => {
    setRecordingStatus("recording");
    setImageSrc(img2);
    // analytics.logEvent('recording_started');
    const media = new MediaRecorder(streamData, { type: mimeType });
    mediaRecorder.current = media;
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
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
    setImageSrc(img1);
    mediaRecorder.current.stop();
  };

  return (
    <div>
      <h3>พูดตามประโยคด้านล่างต่อไปนี้</h3>
      <div className="speech-bubble">
        <h4>{'"' + randomText + '"'}</h4>
      </div>
      <img
        src={imageSrc}
        alt="Speech Image"
        className="speech-image" />
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

export default RepeatGame;
