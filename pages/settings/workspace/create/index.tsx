import React, { useState } from "react";
import Meta from "../../../../components/header/Meta";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../config/app.config";
import { Alert } from "../../../../components/alert/Alert";
import { WorkspaceService } from "../../../../service/space/workspace.service";
import OrgSettingSidebar from "../../../../components/sidebar/OrgSettingSidebar";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;

  return {
    props: {},
  };
};
export default function Index({}: {}) {
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
      const workspaceService = await WorkspaceService.create(data);
      const resWorkspace = workspaceService;

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
      <Meta title={`Create workspace | Settings - ${AppConfig().app.name}`} />
      <Sidebar />
      <OrgSettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <div className="m-4">
            <h2 className="font-bold text-[1.5rem]">Create new workspace</h2>
          </div>
          <div className="m-4">Create workspace</div>
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
