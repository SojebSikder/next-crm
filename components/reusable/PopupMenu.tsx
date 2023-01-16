import React, { useState } from "react";

export function PopupMenu({
  label,
  children,
}: {
  label: string;
  children?: any;
}) {
  const [show, setShow] = useState(false);
  const handleToggle = () => {
    setShow((prev) => !prev);
  };
  return (
    <>
      <button
        onClick={handleToggle}
        id="dropdownTopButton"
        data-dropdown-toggle="dropdownTop"
        data-dropdown-placement="top"
        className="mr-3 mb-3 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {label}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        style={{ transform: "translate(0, -270px)" }}
        id="dropdownTop"
        className={`z-10 ${
          show == false ? "hidden" : ""
        } bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownTopButton"
        >
          {children}
        </ul>
      </div>
    </>
  );
}

export function PopupMenuItem({
  onClick,
  children,
}: {
  onClick?: Function;
  children?: any;
}) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <li>
      <a
        onClick={handleClick}
        // href="#"
        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        {children}
      </a>
    </li>
  );
}
