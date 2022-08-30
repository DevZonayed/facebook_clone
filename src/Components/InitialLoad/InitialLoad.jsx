import React from "react";
import { ToastContainer } from "react-toastify";
const InitialLoad = ({ children }) => {
  // Token Check

  return (
    <>
      {children}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default InitialLoad;
