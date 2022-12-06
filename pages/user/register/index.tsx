import Link from "next/link";
import React from "react";
import Meta from "../../../components/header/Meta";

export default function Register() {
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
            Already have an account? <Link href={"/user/login"}>Sign in</Link>
          </div>
          <div className="m-4 btn-primary">Continue with google</div>
          <div className="m-4">OR</div>
          <div>
            <div className="flex flex-row justify-center">
              <div className="m-4 w-full">
                <input className="input" type="text" placeholder="First Name" />
              </div>
              <div className="m-4 w-full">
                <input className="input" type="text" placeholder="Last Name" />
              </div>
            </div>

            <div className="m-4">
              <input className="input" type="email" placeholder="Work Email" />
            </div>
            <div className="m-4">
              <input className="input" type="password" placeholder="Password" />
            </div>
          </div>

          <div className="m-4 btn-primary">Get Started</div>
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
