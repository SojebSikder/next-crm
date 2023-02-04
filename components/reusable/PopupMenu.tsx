import Link from "next/link";
import React from "react";

type VariantOption = "primary" | "seondary" | (string & {});

export function PopupMenu({
  element,
  label,
  children,
  variant = "primary",
}: {
  element?: any;
  label: any;
  variant?: VariantOption;
  children?: any;
}) {
  return (
    <>
      <div className="flex">
        <div>
          <div className="dropdown relative">
            <div
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {element ? (
                element
              ) : (
                <button
                  className={`
                dropdown-toggle
                px-6
                py-2.5
                primary
                text-white
                font-medium
                text-xs
                leading-tight
            
                rounded
                shadow-md
                ${variant}
                transition
                duration-150
                ease-in-out
                flex
                items-center
                whitespace-nowrap
              `}
                  type="button"
                  // id="dropdownMenuButton1"
                  // data-bs-toggle="dropdown"
                  // aria-expanded="false"
                >
                  {label}
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="caret-down"
                    className="w-2 ml-2"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path
                      fill="currentColor"
                      d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                    ></path>
                  </svg>
                </button>
              )}
            </div>

            <ul
              className="
              dropdown-menu
              min-w-max
              absolute
              hidden
              bg-white
              text-base
              z-50
              float-left
              py-2
              list-none
              text-left
              rounded-lg
              shadow-lg
              mt-1
              m-0
              bg-clip-padding
              border-none
              "
              aria-labelledby="dropdownMenuButton1"
            >
              {children}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export function PopupMenuItem({
  onClick,
  href,
  children,
}: {
  onClick?: Function;
  href?: string;
  children?: any;
}) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <>
      <li>
        {href ? (
          <Link
            href={href}
            className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
          >
            {children}
          </Link>
        ) : (
          <div
            onClick={handleClick}
            className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
          >
            {children}
          </div>
        )}
      </li>
    </>
  );
}
