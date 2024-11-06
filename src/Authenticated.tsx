import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { VideoGrid } from "./layouts/VideoGrid";
import { UpsertVideo } from "./layouts/UpsertVideo";

const AuthenticatedApp: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<VideoGrid />} />
          <Route path="add" element={<UpsertVideo />} />
          <Route path="edit/:videoId" element={<UpsertVideo />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AuthenticatedApp;
