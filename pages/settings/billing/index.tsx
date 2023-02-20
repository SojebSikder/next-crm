import React, { useState } from "react";
import Link from "next/link";
import Meta from "../../../components/header/Meta";
import Sidebar from "../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../config/app.config";
import { Alert } from "../../../components/alert/Alert";
import { useRouter } from "next/navigation";
import OrgSettingSidebar from "../../../components/sidebar/OrgSettingSidebar";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;

  return {
    props: {},
  };
};
export default function Index() {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Meta title={`Billing | Settings - ${AppConfig().app.name}`} />
      <Sidebar />
      <OrgSettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <div>
            <Link href={`/settings/billing/plans`}>
              <div className="m-4 w-[20%] btn primary">Subscribe To Plan</div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
