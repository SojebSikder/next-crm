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

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;
  const workspace_id = query.workspace_id;
  const id = query.id;

  const res_role = await RoleService.findAll(workspace_id, context);
  const roles = res_role.data.data;

  const res_user = await UserService.findOne(id, context);
  const user = res_user.data.data;

  return {
    props: {
      workspace_id: workspace_id,
      roles: roles,
      user: user,
    },
  };
};
export default function Index({
  workspace_id,
  roles,
  user,
}: {
  workspace_id: string;
  roles: any;
  user: any;
}) {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [roleId, setRoleId] = useState<number>(0);

  const handleRoleChange = (e: any) => {
    const id = e.value;
    setRoleId(id);
  };

  const handleUserSubmit = async (e: any) => {
    e.preventDefault();
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const role_id = roleId;

    if (!role_id) {
      return alert("Role not selected");
    }
    setMessage(null);
    setErrorMessage(null);

    const data = {
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      role_id: role_id,
    };

    try {
      const userService = await UserService.create(data);
      const resUser = userService.data;

      if (resUser.error) {
        setErrorMessage(resUser.message);
        setLoading(false);
      } else {
        setMessage(resUser.message);
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
      <Meta title={`${AppConfig().app.name}`} />
      <Sidebar />
      <WorkspaceSettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <div className="m-4">
            <h2 className="font-bold text-[1.5rem]">Edit team member</h2>
          </div>
          <div className="m-4">Edit team member</div>
          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}
          <form onSubmit={handleUserSubmit} method="post">
            <div className="m-4">
              <input
                type="text"
                name="fname"
                defaultValue={user.fname}
                className="w-1/3 input"
                placeholder="First name"
                required
              />
            </div>
            <div className="m-4">
              <input
                type="text"
                name="lname"
                defaultValue={user.lname}
                className="w-1/3 input"
                placeholder="Last name"
                required
              />
            </div>
            <div className="m-4">
              <input
                type="text"
                name="username"
                defaultValue={user.username}
                className="w-1/3 input"
                placeholder="Username"
                required
              />
            </div>
            <div className="m-4">
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                className="w-1/3 input"
                placeholder="Email"
                required
              />
            </div>
            <div className="m-4">
              <Select
                className="w-1/3"
                name="role_id"
                defaultValue={user.role_users.map((role: any) => {
                  return {
                    value: role.role_id,
                    label: role.role.title,
                  };
                })}
                required
                closeMenuOnSelect={false}
                onChange={handleRoleChange}
                options={roles.map((role: any) => {
                  return {
                    value: role.id,
                    label: role.title,
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
