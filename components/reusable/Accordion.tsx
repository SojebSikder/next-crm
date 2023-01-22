import React from "react";

export default function Accordion({
  id = "collapseOne",
  label,
  active = false,
  children,
  ...props
}: {
  id?: string;
  label: string;
  active?: boolean;
  children?: any;
}) {
  return (
    <>
      <div className="accordion" id="accordionExample" {...props}>
        <div className="accordion-item bg-white border border-gray-200">
          <h2 className="accordion-header mb-0" id="headingOne">
            <button
              className={`
                accordion-button
                flex
                items-center
                w-full
                py-4
                px-5
                text-base text-gray-800 text-left
                border-0
                rounded-none
                transition
                focus:outline-none
              `}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${id}`}
              aria-expanded="true"
              aria-controls={`${id}`}
            >
              {label}
            </button>
          </h2>
          <div
            id={`${id}`}
            // className="accordion-collapse collapse show"
            className={`accordion-collapse collapse ${
              active == true ? "show" : ""
            }`}
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            {/* <div className="accordion-body py-4 px-5">{children}</div> */}
            <div className="accordion-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
