import React from "react";
import SideBar from "../components/SideBar/SideBar";
import Calendar  from "../components/Calendar/EventCalendar";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import './AdminPanel.css';

const EventCalendar = () => {
    return (
        <>
                <Navbar />
                <div className="admin-panel">
                    <SideBar />
                    <Calendar />
                </div>
                <Footer />
        </> 
    )
}

export default EventCalendar