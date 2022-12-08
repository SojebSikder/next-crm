import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Meta from "../../../../components/header/Meta";
import Dialog from "../../../../components/reusable/Dialog";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../config/app.config";
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

  // contact
  const res_contacts = await ContactService.findAll(
    Number(workspace_id),
    context
  );
  const contacts = res_contacts.data.data;
  // workspace user
  const res_workspace_users = await WorkspaceUserService.findAll(
    Number(workspace_id),
    context
  );
  const workspace_users = res_workspace_users.data.data;

  return {
    props: {
      workspace_id: workspace_id,
      workspace_users: workspace_users,
    },
  };
};

export default function Contact({
  workspace_id,
  workspace_users,
}: {
  workspace_id: string;
  workspace_users: [];
}) {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const handleContactDialog = () => {
    setShowDialog(true);
  };

  const handleContact = (e: any) => {
    e.preventDefault();
    router.refresh();
  };

  return (
    <div className="flex">
      <Meta title={`Contacts - ${AppConfig().app.name}`} />
      <Sidebar workspace_id={workspace_id} />
      <main className="mt-5 ml-[80px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <Dialog handle={setShowDialog} show={showDialog}>
            <div className="m-4 text-left font-semibold text-xl">
              New Contact
            </div>
            <div className="m-4 text-left">
              Fill up the required information to create a contact.
            </div>
            <form onSubmit={handleContact} method="post">
              <div className="flex flex-row justify-center">
                <div className="m-4 w-full">
                  <input
                    className="input"
                    type="text"
                    name="fname"
                    placeholder="Add First Name"
                  />
                </div>
                <div className="m-4 w-full">
                  <input
                    className="input"
                    type="text"
                    name="lname"
                    placeholder="Add Last Name"
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center">
                <div className="m-4 w-full">
                  <input
                    className="input"
                    type="tel"
                    name="phone_number"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="m-4 w-full">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="Add email address"
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center">
                <div className="m-4 w-full">
                  <select className="input" name="assignee_id">
                    {workspace_users.map((user: any) => {
                      return (
                        <option key={user.user.id} value={user.user.id}>
                          {user.user.fname} {user.user.lname} -{" "}
                          {user.user.email}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="m-4">
                <button type="submit" className="btn-primary w-full">
                  Add
                </button>
              </div>
            </form>
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
