import React from "react";

export default function Accordion({
  label,
  active = false,
  children,
  ...props
}: {
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
                relative
                flex
                items-center
                w-full
                py-4
                px-5
                text-base text-gray-800 text-left
                ${active == true ? "bg-slate-400" : "bg-white"}
                border-0
                rounded-none
                transition
                focus:outline-none
              `}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              {label}
            </button>
          </h2>
          <div
            id="collapseOne"
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
