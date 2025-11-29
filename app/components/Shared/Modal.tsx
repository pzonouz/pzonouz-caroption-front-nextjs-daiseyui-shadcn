import React from "react";

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <dialog open className="modal z-[1000000]">
      <div className="modal-box w-full h-screen max-w-none p-6 relative rounded-none">
        <div className="modal-action w-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </dialog>
  );
};
export { Modal };
