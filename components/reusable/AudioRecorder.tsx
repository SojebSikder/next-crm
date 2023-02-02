import React, { useState } from "react";
import { AudioManager } from "../../util/AudioManager/AudioManager";
import { BiMicrophone, BiStop } from "react-icons/bi";

const recorder = AudioManager.recorder();
export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");

  const startRecord = async () => {
    await recorder.start();
    setIsRecording(true);
  };

  const stopRecord = async () => {
    const audio = await recorder.stop();
    setBlobUrl(audio.audioUrl);
    setIsRecording(false);
  };

  return (
    <div>
      <h1>Record audio</h1>
      <button
        onClick={startRecord}
        disabled={isRecording}
        className="btn primary"
      >
        <BiMicrophone />
      </button>
      <button
        onClick={stopRecord}
        disabled={!isRecording}
        className="btn danger"
      >
        <BiStop />
      </button>

      {blobUrl ? (
        <>
          <a download="file.wav" href={blobUrl}>
            {"download audio"}
          </a>
          <audio id="player" src={blobUrl} controls></audio>
        </>
      ) : null}
    </div>
  );
}
