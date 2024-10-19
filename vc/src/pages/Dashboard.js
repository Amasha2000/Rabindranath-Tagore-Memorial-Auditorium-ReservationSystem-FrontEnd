import React from "react";
import VCDashboard from "../components/Dashboard/Dashboard";
import SideBar from "../components/SideBar/SideBar";
import './VCPanel.css';

const Dashboard = () => {
    return (
        <div className="vc-panel">
            <SideBar />
            <VCDashboard />
        </div>
    )
}

export default Dashboard