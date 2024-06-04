import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <section className="flex flex-col h-full w-full md:flex-row">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </section>
  );
};

export default MainLayout;
