import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Meta from "../../components/header/Meta";
import Dialog from "../../components/reusable/Dialog";
import Sidebar from "../../components/sidebar/Sidebar";
import { AppConfig } from "../../config/app.config";
import { DateHelper } from "../../helper/date.helper";
import { getUser } from "../../hooks/useUser";
import { CountryService } from "../../service/country/country.service";
import { ContactService } from "../../service/space/contact.service";
import { WorkspaceUserService } from "../../service/space/workspaceUser.service";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;
  let workspace_id = query.workspace_id ? query.workspace_id : null;

  // get user details
  const userDetails = await getUser(context);
  if (!workspace_id) {
    const _workspace_users = userDetails.workspace_users;
    workspace_id = _workspace_users[0].workspace.id;
  }

  // contact
  const res_contacts = await ContactService.findAll(workspace_id, context);
  const contacts = res_contacts.data.data;
  // workspace user
  const res_workspace_users = await WorkspaceUserService.findAll(
    workspace_id,
    context
  );
  const workspace_users = res_workspace_users.data.data;
  // country
  const res_countries = await CountryService.findAll(context);
  const countries = res_countries.data.data;

  return {
    props: {
      workspaceId: workspace_id,
      workspace_users: workspace_users,
      contacts: contacts,
      countries: countries,
    },
  };
};

export default function Contact({
  workspaceId,
  workspace_users,
  contacts,
  countries,
}: {
  workspaceId: string;
  contacts: [];
  workspace_users: [];
  countries: [];
}) {
  const router = useRouter();

  const [workspace_id, setWorkspace_id] = useState(workspaceId);

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

  const handleExportContact = async () => {
    const res_contacts = await ContactService.export(workspace_id);
    if (res_contacts) {
      // create file link in browser's memory
      const href = URL.createObjectURL(res_contacts.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "file.csv"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }
  };

  return (
    <div className="flex">
      <Meta title={`Contacts - ${AppConfig().app.name}`} />
      <Sidebar />
      <main className="mt-5 ml-[80px] flex justify-center h-screen">
        <div className="w-[165px] border-solid border-[1px]">
          {workspace_users.map((workspace_user: any) => {
            return (
              <div key={workspace_user.workspace.id}>
                <Link href={`/contact/${workspace_user.workspace.id}`}>
                  <div
                    className={`p-4 hover:text-white ${
                      workspace_id == workspace_user.workspace.id
                        ? "text-white bg-[var(--primary-hover-color)]"
                        : ""
                    } hover:bg-[var(--primary-hover-color)]`}
                  >
                    {workspace_user.workspace.name}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
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
                  <select className="input" name="country_id">
                    {countries.map((country: any) => {
                      return (
                        <option key={country.id} value={country.id}>
                          {country.name} {country.dial_code}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="m-4 w-full">
                  <select className="input" name="assignee_id">
                    <option value={0}>Unassign</option>
                    {workspace_users.map((user: any) => {
                      return (
                        <option key={user.user.id} value={user.user.id}>
                          {user.user.fname} {user.user.lname}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="m-4">
                <button type="submit" className="btn primary w-full">
                  Add
                </button>
              </div>
            </form>
          </Dialog>
          <button onClick={handleContactDialog} className="m-4 btn primary">
            Add Contact
          </button>
          <button className="m-4 btn primary">Import Contacts</button>
          <button onClick={handleExportContact} className="m-4 btn primary">
            Export Contacts
          </button>
          <table className="overflow-x-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Display
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Channels
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Phone
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Country
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Language
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Conversation Status
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Conversation Assignee
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Last Message
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Date Added
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  {/* <span className="sr-only">Action</span> */}
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact: any) => {
                return (
                  <tr
                    key={contact.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {contact.fname} {contact.lname}
                    </th>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {contact.fname} {contact.lname}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">Whatsapp</td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {contact.email}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {contact.phone_number}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">BD</td>
                    <td className="py-4 px-6 whitespace-nowrap">Bangla</td>
                    <td className="py-4 px-6 whitespace-nowrap">Open</td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {contact.assignee_id}
                    </td>
                    <td className="py-4 px-6">Dec 06, 2022 10:31 AM</td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {DateHelper.format(contact.created_at)}
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
