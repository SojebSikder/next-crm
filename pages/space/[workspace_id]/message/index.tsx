import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Meta from "../../../../components/header/Meta";
import Dialog from "../../../../components/reusable/Dialog";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../config/app.config";
import { DateHelper } from "../../../../helper/date.helper";
import { CountryService } from "../../../../service/country/country.service";
import { ContactService } from "../../../../service/space/ContactService";
import { WorkspaceUserService } from "../../../../service/space/WorkspaceUserService";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;
  const workspace_id = query.workspace_id;

  return {
    props: {
      workspace_id: workspace_id,
    },
  };
};

export default function Message({ workspace_id }: { workspace_id: string }) {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const handleContactDialog = () => {
    setShowDialog(true);
  };

  const handleContact = async (e: any) => {
    e.preventDefault();
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const email = e.target.email.value;
    const phone_number = e.target.phone_number.value;
    const country_id = e.target.country_id.value;
    const assignee_id = e.target.assignee_id.value;

    const data = {
      fname: fname,
      lname: lname,
      email: email,
      phone_number: phone_number,
      country_id: country_id,
      assignee_id: assignee_id,
    };
    try {
      const contactService = await ContactService.create(workspace_id, data);
      // router.refresh();
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        // setErrorMessage(error.response.data.message);
        // setLoading(false);
        console.log(error.response.data.message);
      } else {
        // setErrorMessage(error.message);
        // setLoading(false);
        console.log(error.message);
      }
    }
  };

  return (
    <div className="flex">
      <Meta title={`Message - ${AppConfig().app.name}`} />
      <Sidebar />
      <main className="mt-5 ml-[80px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <div className="w-[130px]">
            <Link href={`/space/${workspace_id}/message/1`}>
              <div
                className="cursor-pointer bg-[#eeeeee] 
            transition-all ease-linear hover:bg-[#a19e9e] h-[80px]"
              >
                <h5 className="m-4 font-[500]">sojebsikder</h5>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
