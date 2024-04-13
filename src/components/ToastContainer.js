import { Portal } from "@headlessui/react";
import { Toast } from "./Toast";
import { useEffect } from "react";

export const ToastContainer = ({ toasts, children }) => {
  useEffect(() => {}, [toasts]);
  return (
    <>
      <Portal>
        <div className="fixed top-0 right-0 m-3 p-3 ">
          {toasts.map((x) => {
            return <Toast key={x.id} {...x}></Toast>;
          })}
        </div>
      </Portal>
      {children}
    </>
  );
};
