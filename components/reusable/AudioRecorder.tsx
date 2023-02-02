import React, { useState } from "react";
import { AudioManager } from "../../util/AudioManager/AudioManager";
import { BiMicrophone, BiStop, BiPause, BiPlay } from "react-icons/bi";

const recorder = AudioManager.recorder();
export default function AudioRecorder() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");

  const startRecord = async () => {
    await recorder.start();
    setIsRecording(true);
  };
  const play = async () => {
    recorder.play();
    recorder.getAudio().addEventListener("ended", function () {
      setIsPlaying(false);
    });
    setIsPlaying(true);
  };
  const pause = async () => {
    recorder.pause();
    setIsPlaying(false);
  };

  const stopRecord = async () => {
    const audio = await recorder.stop();
    setBlobUrl(audio.audioUrl);
    setIsRecording(false);
  };

  return (
    <div className="bg-slate-600 text-white p-4 rounded">
      <h1>Record audio</h1>
      <div className="flex">
        <div>
          {blobUrl ? (
            <>
              <button
                onClick={play}
                disabled={isPlaying}
                className="btn bg-slate-500 hover:bg-slate-600 mr-1"
              >
                <BiPlay />
              </button>
              <button
                onClick={pause}
                disabled={!isPlaying}
                className="btn bg-slate-500 hover:bg-slate-600 mr-1"
              >
                <BiPause />
              </button>
            </>
          ) : null}
        </div>

        <div className="mr-5">00:01 / 05:00</div>
        <div>
          <button
            onClick={startRecord}
            disabled={isRecording}
            className="btn bg-slate-500 hover:bg-slate-600 mr-1"
          >
            <BiMicrophone />
          </button>
          <button
            onClick={stopRecord}
            disabled={!isRecording}
            className="btn bg-slate-500 hover:bg-slate-600"
          >
            <BiStop />
          </button>
        </div>

        {/* <div>
          {blobUrl ? (
            <>
              <a download="file.wav" href={blobUrl}>
                {"download audio"}
              </a>
              <audio id="player" src={blobUrl} controls></audio>
            </>
          ) : null}
        </div> */}
      </div>
    </div>
  );
}
