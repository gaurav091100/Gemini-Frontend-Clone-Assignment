import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
