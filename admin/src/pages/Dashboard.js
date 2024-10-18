import React from "react";
import AdminDashboard from "../components/Dashboard/Dashboard";
import SideBar from "../components/SideBar/SideBar";
import './AdminPanel.css';

const Dashboard = () => {
    return (
        <div className="admin-panel">
            <SideBar />
            <AdminDashboard />
        </div>
    )
}

export default Dashboard