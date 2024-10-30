import React from "react";
import ManageCancellation from "../components/CancellationRequest/ManageCancellation";
import SideBar from "../components/SideBar/SideBar";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import './AdminPanel.css';

const ManageCancellationPage = () => {
    return (
       <>
       <Navbar />
       <div className="admin-panel">
            <SideBar />
            <ManageCancellation />
        </div>
        <Footer />
       </>     
    )
}

export default ManageCancellationPage