"use client";

import React from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import UserSidebar from "../../components/sidebar/UserSidebar";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import { SearchProvider } from "../../components/searchContext/search-context";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      <div className="flex">
      <SearchProvider>
        <UserSidebar />
        <DashboardNavbar>{children}</DashboardNavbar>
        </SearchProvider>
      </div>
    </DashboardLayout>
  );
};

export default UserLayout;
