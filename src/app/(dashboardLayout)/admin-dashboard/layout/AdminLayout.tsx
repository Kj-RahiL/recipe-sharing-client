'use client'
import React from "react";
import AdminSidebarWrapper from "../../components/sidebar/AdminSidebar";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import DashboardLayout from "../../layout/dashboardLayout";

const AdminLayout = ({children}: {children:React.ReactNode}) => {
    return (
        <DashboardLayout>
        <div className="flex">
            <AdminSidebarWrapper/>
            <DashboardNavbar>{children}</DashboardNavbar>
        </div>
        </DashboardLayout>
    );
};

export default AdminLayout;