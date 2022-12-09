import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Alert } from "../../../components/alert/Alert";
import Meta from "../../../components/header/Meta";
import { Logo } from "../../../components/reusable/Logo";
import { getUser } from "../../../hooks/useUser";
import { UserService } from "../../../service/user/user.service";

export const getServerSideProps = async (context: any) => {
  const userDetails = await getUser(context);

  if (userDetails) {
    const workspace_id = userDetails.workspace_users[0].workspace.id;
    return {
      redirect: {
        destination: `/space/${workspace_id}/dashboard`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default function Register() {
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // handle register
  const handleRegister = async (e: any) => {
    e.preventDefault();

    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const data = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    };
    setMessage(null);
    setErrorMessage(null);
    setLoading(true);
    try {
      const login = await UserService.register(data);
      const resRegisterData = login.data;
      if (resRegisterData.error) {
        setErrorMessage(resRegisterData.message);
        setLoading(false);
      } else {
        setMessage(resRegisterData.message);
        setLoading(false);

        router.push(`/user/login`);
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
            Already have an account? <Link href={"/user/login"}>Sign in</Link>
          </div>
          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}
          <div className="m-4 btn-primary">Continue with google</div>
          <div className="m-4">OR</div>
          <form onSubmit={handleRegister} method="post">
            <div className="mb-10">
              <div className="flex flex-row justify-center">
                <div className="m-4 w-full">
                  <input
                    className="input"
                    type="text"
                    name="fname"
                    placeholder="First Name"
                  />
                </div>
                <div className="m-4 w-full">
                  <input
                    className="input"
                    type="text"
                    name="lname"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="m-4">
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Work Email"
                />
              </div>
              <div className="m-4">
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </div>

            <button type="submit" className="m-4 btn-primary w-full">
              Sign Up
            </button>
          </form>

          <div className="m-4">
            <span>
              By signing up you agree to our terms of service and privacy
              policy.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
