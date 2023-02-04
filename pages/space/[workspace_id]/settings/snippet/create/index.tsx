import React, { useState } from "react";
import Meta from "../../../../../../components/header/Meta";
import WorkspaceSettingSidebar from "../../../../../../components/sidebar/WorkspaceSettingSidebar";
import Sidebar from "../../../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../../../config/app.config";
import { PermissionService } from "../../../../../../service/permission/permission.service";
import { WorkspaceChannelService } from "../../../../../../service/space/workspaceChannel.service";
import Select from "react-select";
import { RoleService } from "../../../../../../service/space/role.service";
import { Alert } from "../../../../../../components/alert/Alert";
import { SnippetService } from "../../../../../../service/space/snippet.service";

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

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSnippetSubmit = async (e: any) => {
    e.preventDefault();

    setMessage(null);
    setErrorMessage(null);
    setLoading(true);

    const name = e.target.name.value;
    const message = e.target.message.value;

    const data = {
      name: name,
      message: message,
    };
    try {
      const snippetService = await SnippetService.create(workspace_id, data);
      const resSnippet = snippetService.data;

      if (resSnippet.error) {
        setErrorMessage(resSnippet.message);
        setLoading(false);
      } else {
        setMessage(resSnippet.message);
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
      <Meta title={`Create Snippet | Settings - ${AppConfig().app.name}`} />
      <Sidebar />
      <WorkspaceSettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <div className="m-4">
            <h2 className="font-bold text-[1.5rem]">Create new snipet</h2>
          </div>
          <div className="m-4">Create snippet</div>
          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}
          <form onSubmit={handleSnippetSubmit} method="post">
            <div className="m-4">
              <input
                type="text"
                name="name"
                className="w-1/3 input"
                placeholder="Name"
                required
              />
            </div>
            <div className="m-4">
              <textarea
                name="message"
                id="message"
                className="w-1/3 input"
                placeholder="Message"
                required
              ></textarea>
            </div>

            <div className="m-4">
              <button className="btn primary">Save</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
