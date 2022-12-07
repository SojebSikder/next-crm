import Link from "next/link";
import React from "react";
import { Alert } from "../../components/alert/Alert";
import Meta from "../../components/header/Meta";
import { Logo } from "../../components/reusable/Logo";
import Sidebar from "../../components/sidebar/Sidebar";

export default function index() {
  return (
    <div>
      <Meta />
      <Sidebar />
      <main className="flex justify-center h-screen">
        <h1>Hello world</h1>
      </main>
    </div>
  );
}
