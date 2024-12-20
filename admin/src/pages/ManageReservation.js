import React from "react";
import ReservationManage from "../components/ManageReservation/ManageReservation";
import SideBar from "../components/SideBar/SideBar";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import './AdminPanel.css';

const ManageReservation = () => {
    return (
       <>
       <Navbar />
       <div className="admin-panel">
            <SideBar />
            <ReservationManage />
        </div>
        <Footer />
       </>     
    )
}

export default ManageReservation