"use client";

import React from "react";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import { SidebarWrapper } from "../../components/sidebar/sidebarStyles";
import DashboardLayout from "../../layout/dashboardLayout";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      <div className="flex">
        <SidebarWrapper />
        <DashboardNavbar>{children}</DashboardNavbar>
      </div>
    </DashboardLayout>
  );
};

export default UserLayout;
