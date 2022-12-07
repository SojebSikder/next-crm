import React from "react";
import Meta from "../../../../components/header/Meta";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../config/app.config";

export default function Contact() {
  return (
    <div>
      <Meta title={`Contacts - ${AppConfig().app.name}`} />
      <Sidebar workspace_id="1" />
      <main className="flex justify-center h-screen">
        <h1>Hello world contacts here</h1>
      </main>
    </div>
  );
}
