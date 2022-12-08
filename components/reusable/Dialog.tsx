export default function Dialog({
  show = false,
  handle,
  callback = () => {},
  children,
}: {
  show: boolean;
  handle: any;
  callback?: Function;
  children?: any;
}) {
  const close = () => {
    handle(false);
    if (callback) {
      callback();
    }
  };
  return (
    <div>
      <div
        id="popup-modal"
        tabIndex={-1}
        className={`${
          show == false && "hidden"
        } bg-[#000000b5] overflow-y-auto overflow-x-hidden fixed z-50 inset-0 h-modal h-full flex justify-center items-center`}
      >
        <div className="relative p-4 w-full max-w-md h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={close}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              {/* {content && (
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {content}
                </h3>
              )} */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
