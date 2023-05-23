import React from "react";

const MyModal = ({ show, onClose, children, headerText }) => {
  if (!show) return null;
  return (
    <div
      tabindex="-1"
      aria-hidden="true"
      className="flex backdrop-brightness-50  justify-center items-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden inset-0 h-[calc(100%-0rem)] "
    >
      <div className="relative w-full max-w-2xl max-h-[850px] overflow-y-scroll">
        <div className="relative bg-modalBgColor rounded-none shadow overflow-y-auto">
          <div className="p-4  rounded-t">
            <div></div>
            <h3 className="text-xl font-semibold text-gray-900 text-center">
              {headerText}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center relative float-right bottom-8"
              data-modal-hide="defaultModal"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
