"use client";

import React from "react";
import DashboardNavbar from "../../../components/dashboardNavbar/DashboardNavbar";
import DashboardLayout from "../../../layout/dashboardLayout";
import UserSidebar from "../../../components/sidebar/UserSidebar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      <div className="flex">
        <UserSidebar />
        <DashboardNavbar>{children}</DashboardNavbar>
      </div>
    </DashboardLayout>
  );
};

export default UserLayout;
