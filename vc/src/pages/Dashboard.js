import React from "react";
import VCDashboard from "../components/Dashboard/Dashboard";
import SideBar from "../components/SideBar/SideBar";
import NavBar from "../components/Nav/NavBar";
import Footer from "../components/Footer/Footer";
import './VCPanel.css';

const Dashboard = () => {
    return (
        <>
        <NavBar />
        <div className="vc-panel">
            <SideBar />
            <VCDashboard />
        </div>
        <Footer />
        </>
    )
}

export default Dashboard