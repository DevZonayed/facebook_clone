import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Components/Pages/HomePage/HomePage";
import Login from "../Components/Pages/LoginPage/Login";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Routers;
