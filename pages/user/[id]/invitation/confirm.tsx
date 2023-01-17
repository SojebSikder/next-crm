import React, { useState } from "react";
import Select from "react-select";
import Meta from "../../../../components/header/Meta";
import WorkspaceSettingSidebar from "../../../../components/sidebar/WorkspaceSettingSidebar";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../config/app.config";
import { RoleService } from "../../../../service/space/role.service";
import { Alert } from "../../../../components/alert/Alert";
import { WorkspaceUserService } from "../../../../service/space/workspaceUser.service";
import { UserService } from "../../../../service/user/user.service";
import Link from "next/link";

export const getServerSideProps = async (context: any) => {
  const { req, query, params, res, asPath, pathname } = context;

  const id = query.id;
  const email = query.email ? query.email : null;
  const token = query.token ? query.token : null;

  return {
    props: {
      id: id,
      email: email,
      token: token,
    },
  };
};
export default function Index({
  id,
  email,
  token,
}: {
  id: number;
  email: string;
  token: string;
}) {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUserSubmit = async (e: any) => {
    e.preventDefault();

    const password = e.target.password.value;

    if (!password) {
      return alert("Enter your password");
    }
    setMessage(null);
    setErrorMessage(null);

    const data = {
      id: id,
      token: token,
      email: email,
      password: password,
    };

    try {
      const userService = await UserService.confirm(data);
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
      <main className="mt-5 flex justify-center ">
        <div className="w-1/3 shadow-md sm:rounded-lg">
          <div className="m-4">
            <h2 className="font-bold text-[1.5rem]">Setup</h2>
          </div>
          <div className="m-4">Setup your account</div>
          {loading && <div>Please wait...</div>}
          {message && (
            <Alert type={"success"}>
              {message}
              <br />
              <Link href={"/user/login"}>You can login from here.</Link>
            </Alert>
          )}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}
          <form onSubmit={handleUserSubmit} method="post">
            <div className="m-4">
              <input
                disabled
                type="email"
                name="email"
                defaultValue={email}
                className="input"
                placeholder="Email"
                required
              />
            </div>
            <div className="m-4">
              <input
                type="text"
                name="password"
                className="input"
                placeholder="Minimum 6 characters"
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
