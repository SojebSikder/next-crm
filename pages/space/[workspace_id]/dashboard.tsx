import React from "react";
import Meta from "../../../components/header/Meta";
import Sidebar from "../../../components/sidebar/Sidebar";

export default function Dashboard() {
  return (
    <div>
      <Meta />
      <Sidebar workspace_id="1" />
      <main className="flex justify-center h-screen">
        <h1>Hello world</h1>
      </main>
    </div>
  );
}
