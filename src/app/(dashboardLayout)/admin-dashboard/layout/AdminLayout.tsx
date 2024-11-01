"use client";
import React from "react";
import AdminSidebarWrapper from "../../components/sidebar/AdminSidebar";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardLayout from "../../layout/dashboardLayout";
import { SearchProvider } from "../../components/searchContext/search-context";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      <div className="flex">
        <SearchProvider>
          <AdminSidebarWrapper />

          <DashboardNavbar>{children}</DashboardNavbar>
        </SearchProvider>
      </div>
    </DashboardLayout>
  );
};

export default AdminLayout;
