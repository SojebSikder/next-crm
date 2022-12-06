import Link from "next/link";
import React from "react";
import Meta from "../../../components/header/Meta";

export default function Login() {
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
          <div className="text-center font-bold">Whatsapp crm</div>
          <div className="text-center">
            Don{"'"}t have an account?{" "}
            <Link href={"/user/register"}>Sign up for free</Link>
          </div>
          <div className="m-4 btn-primary">Continue with google</div>
          <div className="m-4">OR</div>
          <div className="m-4">
            <input className="input" type="email" placeholder="Email address" />
          </div>
          <div className="m-4">
            <input className="input" type="password" placeholder="Password" />
          </div>

          <div className="m-4 btn-primary">Sign In</div>
          <div className="m-4">
            <Link href={"/user/password/forget"}>Forget password</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
