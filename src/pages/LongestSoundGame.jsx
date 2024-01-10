import { useState, useRef, useEffect } from "react";
import './Pages.css'
import texts from "./LongestSoundText.js";
import "./RepeatGame.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

const LongestSoundGame = () => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [randomText, setRandomText] = useState("");
  const mimeType = "audio/wav"; // You can change this to the desired audio format

  useEffect(() => {
    setRandomText(getRandomText());
  }, []);

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
    setRandomText(getRandomText());
  };

  const startRecording = (streamData) => {
    setRecordingStatus("recording");
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
    mediaRecorder.current.stop();
  };

  return (
    <div>
      <h3>พูดตามประโยคด้านล่างให้ยาวที่สุด</h3>
      <h4>{'"' + randomText + '"'}</h4>
      <main>
        <div className="audio-controls">
          {!permission ? (
            <button
              onClick={() => {
                getMicrophonePermission();
              }}
              type="button"
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
