import React from "react";
import SideBar from "../components/SideBar/SideBar";
import Calendar  from "../components/EventCalendar/Calendar";
import './VCPanel.css';

const EventCalendar = () => {
    return (
        <div className="vc-panel">
            <SideBar />
            <Calendar />
        </div>
    )
}

export default EventCalendar