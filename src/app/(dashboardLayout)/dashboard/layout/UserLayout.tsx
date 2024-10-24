"use client";

import React from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import UserSidebar from "../../components/sidebar/UserSidebar";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";

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
