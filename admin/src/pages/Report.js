import React from "react";
import ViewReport from "../components/Report/ViewReport";
import SideBar from "../components/SideBar/SideBar";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import './AdminPanel.css';

const Report = () => {
    return (
        <>
        <Navbar />
        <div className="admin-panel">
            <SideBar />
            <ViewReport />
        </div>
        <Footer />
        </>   
    )
}

export default Report