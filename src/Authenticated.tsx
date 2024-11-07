import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { VideoGrid } from "./layouts/VideoGrid";
import { UpsertVideo } from "./layouts/UpsertVideo";

const MainLayoutWithRedirect: React.FC = () => {
  const location = useLocation();

  // Redirect if the URL contains only a hash, an unknown path, or a trailing slash.
  if (
    location.pathname === "/" ||
    location.pathname === "" ||
    location.hash ||
    location.pathname === "/#"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <MainLayout />;
};

const AuthenticatedApp: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayoutWithRedirect />}>
          <Route path="dashboard" element={<VideoGrid />} />
          <Route path="add" element={<UpsertVideo />} />
          <Route path="edit/:videoId" element={<UpsertVideo />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AuthenticatedApp;
