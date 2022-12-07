import React, { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Meta from "../../../components/header/Meta";
import { Logo } from "../../../components/reusable/Logo";
import { CookieHelper } from "../../../helper/cookie.helper";
import { UserService } from "../../../service/user/user.service";
import { Alert } from "../../../components/alert/Alert";

export default function Login() {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle login
  const handlelogin = async (e: any) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const data = {
      email: email,
      password: password,
    };
    setMessage(null);
    setErrorMessage(null);
    setLoading(true);
    try {
      const login = await UserService.login(data);
      if (login.data.error) {
        setErrorMessage(login.data.message);
        setLoading(false);
      } else if (login.data.authorization) {
        // set cookie
        CookieHelper.set({
          key: "token",
          value: login.data.authorization.token,
        });
        setMessage(login.data.message);
        setLoading(false);
        redirect("/app/space/[id]/dashboard");
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
      <Meta />
      <main className="flex justify-center h-screen">
        <div
          style={{
            padding: "50px",
            width: "50%",
          }}
          className="self-center"
        >
          <Logo />
          <div className="text-center">
            Don{"'"}t have an account?{" "}
            <Link href={"/user/register"}>Sign up for free</Link>
          </div>
          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}
          <div className="m-4 btn-primary">Continue with google</div>
          <div className="m-4">OR</div>
          <form onSubmit={handlelogin} method="post">
            <div className="m-4">
              <input
                className="input"
                type="email"
                placeholder="Email address"
              />
            </div>
            <div className="m-4">
              <input className="input" type="password" placeholder="Password" />
            </div>

            <div className="m-4 btn-primary">Sign In</div>
          </form>

          <div className="m-4">
            <Link href={"/user/password/forget"}>Forget password</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
