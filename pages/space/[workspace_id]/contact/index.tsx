import React, { useState } from "react";
import Meta from "../../../../components/header/Meta";
import Dialog from "../../../../components/reusable/Dialog";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../config/app.config";

export const getServerSideProps = (context: {
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

export default function Contact({ workspace_id }: { workspace_id: string }) {
  const [showDialog, setShowDialog] = useState(false);
  const handleContactDialog = () => {
    setShowDialog(true);
  };
  return (
    <div className="flex">
      <Meta title={`Contacts - ${AppConfig().app.name}`} />
      <Sidebar workspace_id={workspace_id} />
      <main className="mt-5 ml-[80px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <Dialog handle={setShowDialog} show={showDialog}>
            login now
          </Dialog>
          <button onClick={handleContactDialog} className="m-4 btn-primary">
            Add Contact
          </button>
          <button className="m-4 btn-primary">Import Contacts</button>
          <table className="overflow-x-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Display
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Channels
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Phone
                </th>
                <th scope="col" className="py-3 px-6">
                  Country
                </th>
                <th scope="col" className="py-3 px-6">
                  Language
                </th>
                <th scope="col" className="py-3 px-6">
                  Conversation Status
                </th>
                <th scope="col" className="py-3 px-6">
                  Conversation Assignee
                </th>
                <th scope="col" className="py-3 px-6">
                  Last Message
                </th>
                <th scope="col" className="py-3 px-6">
                  Date Added
                </th>
                <th scope="col" className="py-3 px-6">
                  {/* <span className="sr-only">Action</span> */}
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17{'"'}
                </th>
                <td className="py-4 px-6">sojebsikder</td>
                <td className="py-4 px-6">Whatsapp</td>
                <td className="py-4 px-6">sojebsikder@gmail.com</td>
                <td className="py-4 px-6">8801833962595</td>
                <td className="py-4 px-6">BD</td>
                <td className="py-4 px-6">Bangla</td>
                <td className="py-4 px-6">Open</td>
                <td className="py-4 px-6">N/A</td>
                <td className="py-4 px-6">Dec 06, 2022 10:31 AM</td>
                <td className="py-4 px-6">Dec 06, 2022 10:31 AM</td>

                <td className="py-4 px-6 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
