import React, { useState } from "react";
import Meta from "../../../../../../components/header/Meta";
import Dialog from "../../../../../../components/reusable/Dialog";
import SettingSidebar from "../../../../../../components/sidebar/SettingSidebar";
import Sidebar from "../../../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../../../config/app.config";
import CustomImage from "../../../../../../components/reusable/CustomImage";
import Link from "next/link";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;
  const workspace_id = query.workspace_id;

  return {
    props: {
      workspace_id: workspace_id,
    },
  };
};
export default function Index({ workspace_id }: { workspace_id: string }) {
  const [showDialog, setShowDialog] = useState(false);
  const handleChannelDialog = () => {
    setShowDialog(true);
  };
  const handleChannel = () => {
    setShowDialog(true);
  };

  return (
    <div>
      <Meta title={`Channels | Settigs - ${AppConfig().app.name}`} />
      <Sidebar workspace_id={workspace_id} />
      <SettingSidebar workspace_id={workspace_id} />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <button onClick={handleChannelDialog} className="m-4 btn-primary">
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}
