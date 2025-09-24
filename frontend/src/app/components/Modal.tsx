import React from "react";

export const ConfirmationModal = ({
  open = false,
  setOpen = () => { },
  body = "Are you sure?",
  onConfirm = () => { },
  onCancel = () => { },
}: {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  body?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}) => {
  if (!open) {
    return null;
  }

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleConfirm = (event: React.MouseEvent) => {
    event.stopPropagation();
    onConfirm();
    setOpen(false);
  };

  const handleCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    onCancel();
    setOpen(false);
  };

  return (
    <div
      onClick={handleClose}
      id="popup-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative p-4 w-full max-w-md max-h-full"
      >
        <div className="relative bg-emerald-100 rounded-lg shadow-sm">
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-3 end-2.5 text-white bg-violet-300 hover:bg-violet-500 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-violet-400 w-12 h-12"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div className="m-4">{body}</div>
            <button
              onClick={handleConfirm}
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Confirm
            </button>
            <button
              onClick={handleCancel}
              data-modal-hide="popup-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-gray-500 rounded-lg border border-gray-200 hover:bg-gray-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
