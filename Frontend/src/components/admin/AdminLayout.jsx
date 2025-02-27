import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 p-5 w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
