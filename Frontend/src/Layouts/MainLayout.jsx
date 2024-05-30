import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <section className="flex h-full">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </section>
  );
};

export default MainLayout;
