import React from "react";
import { logoutFirebase } from "../firebase/providers";

import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  const logout = async () => {
    await logoutFirebase();
  };

  return (
    <div>
      <div className="top-container">
        <h3>Stavros Halkias video library</h3>
        <button className="button" onClick={logout}>
          Sign out
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
