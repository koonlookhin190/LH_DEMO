import { useState, useRef, useEffect } from "react";
// import texts from "./Text.js";
import "./RepeatGame.css";

const RepeatGame = () => {
  // const [permission, setPermission] = useState(false);
  // const mediaRecorder = useRef(null);
  // const [recordingStatus, setRecordingStatus] = useState("inactive");
  // const [stream, setStream] = useState(null);
  // const [audioChunks, setAudioChunks] = useState([]);
  // const [audio, setAudio] = useState(null);
  // const [randomText, setRandomText] = useState("");
  // const mimeType = "audio/wav"; // You can change this to the desired audio format

  // useEffect(() => {
  //   setRandomText(getRandomText());
  // }, []);

  // const getRandomText = () => {
  //   const randomIndex = Math.floor(Math.random() * texts.length);
  //   return texts[randomIndex];
  // };

  // const getMicrophonePermission = async () => {
  //   try {
  //     const streamData = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //       video: false,
  //     });
  //     setPermission(true);
  //     setStream(streamData);
  //     startRecording(streamData);
  //   } catch (err) {
  //     console.error(err);

  //     if (
  //       err.name === "NotAllowedError" ||
  //       err.name === "PermissionDeniedError"
  //     ) {
  //       alert(
  //         "Error: Microphone permission denied. Please enable microphone access in your browser settings."
  //       );
  //     } else {
  //       alert(
  //         "Error: Unable to access the microphone. Please check your browser settings."
  //       );
  //     }
  //   }
  //   setRandomText(getRandomText());
  // };

  // const startRecording = (streamData) => {
  //   setRecordingStatus("recording");
  //   const media = new MediaRecorder(streamData, { type: mimeType });
  //   mediaRecorder.current = media;

  //   // Clear the previous chunks when starting a new recording
  //   setAudioChunks([]);

  //   mediaRecorder.current.ondataavailable = (event) => {
  //     if (typeof event.data === "undefined") return;
  //     if (event.data.size === 0) return;

  //     // Update the state with the new audio chunk
  //     setAudioChunks((prevChunks) => [...prevChunks, event.data]);
  //   };

  //   mediaRecorder.current.onstop = async () => {
  //     const audioBlob = new Blob(audioChunks, { type: mimeType });
  //     setAudioChunks([]);
  //     const audioUrl = URL.createObjectURL(audioBlob);
  //     setAudio(audioUrl);
  //     // Handle Firebase storage upload if needed
  //     // uploadAudioToFirebase(audioBlob);
  //     console.log("Audio recorded successfully:", audioUrl);
  //   };

  //   mediaRecorder.current.start();
  // };

  // const stopRecording = () => {
  //   setRecordingStatus("inactive");
  //   mediaRecorder.current.stop();
  // };

  return (
    <div>
      {/* <h3>พูดตามประโยคด้านล่างต่อไปนี้</h3>
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
              เปิดไมโครโฟน
            </button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <button
              onClick={() => {
                startRecording(stream);
              }}
              type="button"
            >
              เริ่มบันทึกเสียง
            </button>
          ) : null}
          {permission && recordingStatus === "recording" ? (
            <button
              onClick={() => {
                stopRecording();
              }}
              type="button"
            >
              หยุดบันทึกเสียง
            </button>
          ) : null}
        </div>
        <div>{audio && <audio controls src={audio} />}</div>
      </main> */}
      <h1>I SIN</h1>
    </div>
  );
};

export default RepeatGame;
