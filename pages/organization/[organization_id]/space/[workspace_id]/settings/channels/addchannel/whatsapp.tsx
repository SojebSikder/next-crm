import React, { useState } from "react";
import { Alert } from "../../../../../../../../components/alert/Alert";
import Meta from "../../../../../../../../components/header/Meta";
import SettingSidebar from "../../../../../../../../components/sidebar/SettingSidebar";
import Sidebar from "../../../../../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../../../../../config/app.config";
import { WorkspaceChannelService } from "../../../../../../../../service/space/WorkspaceChannelService";

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

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChannelDialog = () => {
    setShowDialog(true);
  };

  const handleChannel = async (e: any) => {
    e.preventDefault();
    const phone_number = e.target.phone_number.value;
    const access_token = e.target.access_token.value;
    const account_id = e.target.account_id.value;

    const data = {
      phone_number: phone_number,
      access_token: access_token,
      account_id: account_id,
    };
    setMessage(null);
    setErrorMessage(null);
    setLoading(true);
    try {
      const workspaceChannelService = await WorkspaceChannelService.create(
        workspace_id,
        data
      );
      const res_workspaceChannel = workspaceChannelService.data;
      if (res_workspaceChannel.error) {
        setErrorMessage(res_workspaceChannel.message);
        setLoading(false);
      } else {
        setMessage(res_workspaceChannel.message);
        setLoading(false);
      }
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setLoading(false);
        console.log(error.response.data.message);
      } else {
        setErrorMessage(error.message);
        setLoading(false);
        console.log(error.message);
      }
    }
  };

  return (
    <div>
      <Meta title={`Channels | Settigs - ${AppConfig().app.name}`} />
      <Sidebar />
      <SettingSidebar />
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
          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}
          <form onSubmit={handleChannel} method="post">
            <div className="m-4">
              <input
                type="text"
                name="phone_number"
                className="w-1/3 input"
                placeholder="Phone number"
                required
              />
            </div>
            <div className="m-4">
              <input
                type="text"
                name="access_token"
                className="w-1/3 input"
                placeholder="Access token"
                required
              />
            </div>
            <div className="m-4">
              <input
                type="text"
                name="account_id"
                className="w-1/3 input"
                placeholder="Account id"
                required
              />
            </div>
            <div className="m-4">
              <button className="btn primary">Submit</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
