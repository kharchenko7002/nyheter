// src/App.js
import React from "react";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import AppRoutes from "./AppRoutes.jsx";

export default function App() {
  return (
    <DashboardLayout>
      <AppRoutes />
    </DashboardLayout>
  );
}
