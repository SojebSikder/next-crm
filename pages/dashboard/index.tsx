import React, { useState } from "react";
import AppHeader from "../../components/header/app/Header";
import Meta from "../../components/header/Meta";
import Sidebar from "../../components/sidebar/Sidebar";
import { getUser } from "../../hooks/useUser";
import { AudioManager } from "../../util/AudioManager/AudioManager";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;

  const userDetails = await getUser(context);

  return {
    props: {
      userDetails,
    },
  };
};

const recorder = AudioManager.recorder();
export default function Dashboard({ userDetails }: { userDetails: any }) {
  const [blobUrl, setBlobUrl] = useState("");
  const startRecord = async () => {
    recorder.start();
  };
  const stopRecord = async () => {
    const audio = await recorder.stop();
    setBlobUrl(audio.audioUrl);
    // recorder.play();
  };
  return (
    <div>
      <AppHeader customer_trial_end_at={userDetails.tenant.trial_end_at} />
      <Meta />
      <Sidebar />
      <main className="flex justify-center">
        <h1>
          Welcome, {userDetails.fname} {userDetails.lname}
        </h1>
        <div>
          <h1>Record audio</h1>
          <button onClick={startRecord} className="btn primary">
            Start
          </button>
          <button onClick={stopRecord} className="btn danger">
            Stop
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
      </main>
    </div>
  );
}
