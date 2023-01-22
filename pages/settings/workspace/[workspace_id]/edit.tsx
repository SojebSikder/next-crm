import React, { useState } from "react";
import Meta from "../../../../components/header/Meta";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../config/app.config";
import { PermissionService } from "../../../../service/permission/permission.service";
import Select from "react-select";
import { RoleService } from "../../../../service/space/role.service";
import { Alert } from "../../../../components/alert/Alert";
import OrgSettingSidebar from "../../../../components/sidebar/OrgSettingSidebar";
import { WorkspaceService } from "../../../../service/space/workspace.service";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;
  const workspace_id = query.workspace_id;

  const resWorkspace = await WorkspaceService.findOne(workspace_id, context);
  const workspace = resWorkspace.data;

  return {
    props: {
      workspace_id: workspace_id,
      workspace: workspace,
    },
  };
};
export default function Index({
  workspace_id,
  workspace,
}: {
  workspace_id: string;
  workspace: any;
}) {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleWorkspaceSubmit = async (e: any) => {
    e.preventDefault();

    setMessage(null);
    setErrorMessage(null);
    setLoading(true);

    const name = e.target.name.value;

    const data = {
      name: name,
    };
    try {
      const workspaceService = await WorkspaceService.update(
        workspace_id,
        data
      );
      const resWorkspace = workspaceService.data;

      if (resWorkspace.error) {
        setErrorMessage(resWorkspace.message);
        setLoading(false);
      } else {
        setMessage(resWorkspace.message);
        setLoading(false);
      }
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setLoading(false);
      } else {
        setErrorMessage(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Meta title={`Edit Role | Settigs - ${AppConfig().app.name}`} />
      <Sidebar />
      <OrgSettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <div className="m-4">
            <h2 className="font-bold text-[1.5rem]">Edit role</h2>
          </div>
          <div className="m-4">Edit role with specific permissions</div>
          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}
          <form onSubmit={handleWorkspaceSubmit} method="post">
            <div className="m-4">
              <input
                type="text"
                name="name"
                className="w-1/3 input"
                placeholder="Name"
                defaultValue={workspace.name}
                required
              />
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
