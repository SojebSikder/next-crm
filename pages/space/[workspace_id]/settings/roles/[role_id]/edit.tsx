import React, { useState } from "react";
import Meta from "../../../../../../components/header/Meta";
import SettingSidebar from "../../../../../../components/sidebar/SettingSidebar";
import Sidebar from "../../../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../../../config/app.config";
import { PermissionService } from "../../../../../../service/permission/permission.service";
import { WorkspaceChannelService } from "../../../../../../service/space/WorkspaceChannelService";
import Select from "react-select";
import { RoleService } from "../../../../../../service/space/RoleService";
import { Alert } from "../../../../../../components/alert/Alert";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;
  const workspace_id = query.workspace_id;
  const role_id = query.role_id;

  const res_permission = await PermissionService.findAll(workspace_id, context);
  const permissions = res_permission.data.data;

  const res_role = await RoleService.findOne(role_id, workspace_id, context);
  const role = res_role.data.data;

  return {
    props: {
      workspace_id: workspace_id,
      permissions: permissions,
      role_id: role_id,
      role: role,
    },
  };
};
export default function Index({
  workspace_id,
  permissions,
  role_id,
  role,
}: {
  workspace_id: string;
  permissions: any;
  role_id: string;
  role: any;
}) {
  const [showDialog, setShowDialog] = useState(false);
  const handleChannelDialog = () => {
    setShowDialog(true);
  };

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [permissionIds, setPermissionIds] = useState<number[]>([]);

  const handlePermissionChange = (e: any) => {
    const ids = e.map((option: any) => {
      return option.value;
    });
    setPermissionIds(ids);
  };

  const handleRoleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    const permission_ids = permissionIds;

    const data = {
      title: title,
      permission_ids: permission_ids,
    };
    try {
      const roleService = await RoleService.update(role_id, workspace_id, data);
      const resRole = roleService.data;

      if (resRole.error) {
        setErrorMessage(resRole.message);
        setLoading(false);
      } else {
        setMessage(resRole.message);
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
      <Meta title={`Edit Role | Settigs - ${AppConfig().app.name}`} />
      <Sidebar />
      <SettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <div className="m-4">
            <h2 className="font-bold text-[1.5rem]">Edit role</h2>
          </div>
          <div className="m-4">Edit role with specific permissions</div>
          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}
          <form onSubmit={handleRoleSubmit} method="post">
            <div className="m-4">
              <input
                type="text"
                name="title"
                className="w-1/3 input"
                placeholder="Title"
                defaultValue={role.title}
                required
              />
            </div>
            <div className="m-4">
              <Select
                name="permission_ids"
                defaultValue={role.permission_roles.map((permission: any) => {
                  return {
                    value: permission.permission.id,
                    label: permission.permission.title,
                  };
                })}
                required
                isMulti
                closeMenuOnSelect={false}
                onChange={handlePermissionChange}
                options={permissions.map((permission: any) => {
                  return {
                    value: permission.permission.id,
                    label: permission.permission.title,
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
