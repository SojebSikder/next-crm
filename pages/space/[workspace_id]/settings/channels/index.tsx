import React, { useState } from "react";
import Meta from "../../../../../components/header/Meta";
import Dialog from "../../../../../components/reusable/Dialog";
import SettingSidebar from "../../../../../components/sidebar/SettingSidebar";
import Sidebar from "../../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../../config/app.config";
import CustomImage from "../../../../../components/reusable/CustomImage";
import Link from "next/link";
import { WorkspaceChannelService } from "../../../../../service/space/WorkspaceChannelService";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;
  const workspace_id = query.workspace_id;

  const res_workspaceChannels = await WorkspaceChannelService.findAll(
    workspace_id,
    context
  );
  const workspaceChannels = res_workspaceChannels.data.data;

  return {
    props: {
      workspace_id: workspace_id,
      workspace_channels: workspaceChannels,
    },
  };
};
export default function Index({
  workspace_id,
  workspace_channels,
}: {
  workspace_id: string;
  workspace_channels: [];
}) {
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
      <Sidebar />
      <SettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <Dialog handle={setShowDialog} show={showDialog}>
            <div className="m-4 text-left font-semibold text-xl">
              Connect your Channel
            </div>
            <div className="m-4 text-left">
              Select the Channel that you want to connect.
            </div>
            <form onSubmit={handleChannel} method="post">
              <div className="flex flex-row justify-center">
                <div className="m-4 w-full">
                  <Link
                    href={`/space/${workspace_id}/settings/channels/addchannel/whatsapp`}
                  >
                    <CustomImage
                      src="/assets/images/whatsapp_cloud.svg"
                      height={65}
                      width={69}
                      alt=""
                    />
                  </Link>
                </div>
              </div>
            </form>
          </Dialog>
          <button onClick={handleChannelDialog} className="m-4 btn primary">
            Add Channel
          </button>
          {workspace_channels.map((channel: any) => {
            return (
              <div
                key={channel.id}
                className="m-4 p-4 border-solid shadow-sm border-[1px] border-b-slate-500"
              >
                <div>
                  {channel.channel_type} - {channel.channel_name}
                </div>
                <br />
                <div>
                  webhook url:
                  <br />
                  <span className="ml-4 font-[500]">{channel.webhook_url}</span>
                </div>
                <div>
                  verify token:
                  <br />
                  <span className="ml-4 font-[500]">
                    {channel.verify_token}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
