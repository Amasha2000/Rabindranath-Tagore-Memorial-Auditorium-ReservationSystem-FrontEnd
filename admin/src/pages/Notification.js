import React from "react";
import Notification from "../components/Notification/Notification";
import SideBar from "../components/SideBar/SideBar";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import './AdminPanel.css';

const Dashboard = () => {
    return (
       <>
       <Navbar />
       <div className="admin-panel">
            <SideBar />
            <Notification />
        </div>
        <Footer />
       </>     
    )
}

export default Dashboard