import React from "react";
import SideBar from "../components/SideBar/SideBar";
import Calendar  from "../components/EventCalendar/Calendar";
import NavBar from "../components/Nav/NavBar";
import Footer from "../components/Footer/Footer";
import './VCPanel.css';

const EventCalendar = () => {
    return (
        <>
            <NavBar />
                <div className="vc-panel">
                    <SideBar />
                    <Calendar />
                </div>
            <Footer />
        </> 
    )
}

export default EventCalendar