import React from "react";
import Events from "../components/Event/Events"
import SideBar from "../components/SideBar/SideBar";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import './AdminPanel.css';

const ManageEvents = () => {
    return (
        <>
        <Navbar />
        <div className="admin-panel">
            <SideBar />
            <Events />
        </div>
        <Footer />
        </>   
    )
}

export default ManageEvents