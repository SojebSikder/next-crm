import React, { useState } from "react";
import Select from "react-select";
import Meta from "../../../../../../components/header/Meta";
import WorkspaceSettingSidebar from "../../../../../../components/sidebar/WorkspaceSettingSidebar";
import Sidebar from "../../../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../../../config/app.config";
import { RoleService } from "../../../../../../service/space/role.service";
import { Alert } from "../../../../../../components/alert/Alert";
import { WorkspaceUserService } from "../../../../../../service/space/workspaceUser.service";
import { UserService } from "../../../../../../service/user/user.service";
import { getUser } from "../../../../../../hooks/useUser";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;
  const workspace_id = query.workspace_id;

  // get user details
  const userDetails = await getUser(context);

  const resUsers = await UserService.findAll(context);
  const users = resUsers.data.data;

  return {
    props: {
      workspace_id: workspace_id,
      users: users,
    },
  };
};
export default function Index({
  workspace_id,
  users,
}: {
  workspace_id: number;
  users: any;
}) {
  const [showDialog, setShowDialog] = useState(false);
  const handleChannelDialog = () => {
    setShowDialog(true);
  };

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUserSubmit = async (e: any) => {
    e.preventDefault();

    const user_id: number = e.target.user_id.value;

    if (!user_id) {
      return alert("User not selected");
    }
    setMessage(null);
    setErrorMessage(null);

    const data = {
      user_id: user_id,
    };

    try {
      const workspaceService = await WorkspaceUserService.create(
        workspace_id,
        data
      );
      const resWorkspaceUser = workspaceService.data;

      if (resWorkspaceUser.error) {
        setErrorMessage(resWorkspaceUser.message);
        setLoading(false);
      } else {
        setMessage(resWorkspaceUser.message);
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
      <Meta title={`Add workspace user | Settings - ${AppConfig().app.name}`} />
      <Sidebar />
      <WorkspaceSettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <div className="m-4">
            <h2 className="font-bold text-[1.5rem]">Workspace user</h2>
          </div>
          <div className="m-4">Add user to this workspace</div>
          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}
          <form onSubmit={handleUserSubmit} method="post">
            <div className="m-4">
              <Select
                className="w-1/3"
                name="user_id"
                required
                // closeMenuOnSelect={false}
                options={users.map((user: any) => {
                  return {
                    value: user.id,
                    label: `${user.username}`,
                  };
                })}
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
