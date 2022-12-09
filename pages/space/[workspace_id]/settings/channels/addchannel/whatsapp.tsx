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
          <div className="m-4">
            <h2 className="font-bold text-[1.5rem]">WhatsApp API Setup</h2>
          </div>
          <div className="m-4">
            WhatsApp API access will allow you to manage customer support, send
            promotional broadcasts, and send abandoned cart and other template
            messages using your WhatsApp API approved phone number.
          </div>
          <div className="m-4">
            <input type="text" className="w-1/3 input" placeholder="" />
          </div>
          <div className="m-4">
            <button onClick={handleChannelDialog} className="btn-primary">
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
