import React from "react";
import AppHeader from "../../components/header/app/Header";
import Meta from "../../components/header/Meta";
import AudioRecorder from "../../components/reusable/AudioRecorder/AudioRecorder";
import Workflow from "../../components/reusable/Workflow/Workflow";
import Sidebar from "../../components/sidebar/Sidebar";
import { getUser } from "../../hooks/useUser";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;

  const userDetails = await getUser(context);

  return {
    props: {
      userDetails,
    },
  };
};

export default function Dashboard({ userDetails }: { userDetails: any }) {
  return (
    <div>
      <AppHeader customer_trial_end_at={userDetails.tenant.trial_end_at} />
      <Meta />
      <Sidebar />
      <main className="flex justify-center">
        <div>
          <h1>
            Welcome, {userDetails.fname} {userDetails.lname}
          </h1>
        </div>
        <br />
        <div>
          <AudioRecorder />
        </div>
        <div>
          <Workflow />
        </div>
      </main>
    </div>
  );
}
