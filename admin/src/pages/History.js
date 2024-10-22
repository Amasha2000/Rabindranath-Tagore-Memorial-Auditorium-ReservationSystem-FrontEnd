import React from "react";
import SideBar from "../components/SideBar/SideBar";
import History from "../components/History/History";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import './AdminPanel.css';

const HistoryPage = () => {
    return (
        <>
                <Navbar />
                <div className="admin-panel">
                    <SideBar />
                    <History />
                </div>
                <Footer />
        </> 
    )
}

export default HistoryPage