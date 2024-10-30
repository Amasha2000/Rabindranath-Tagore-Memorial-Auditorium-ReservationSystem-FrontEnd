import React from "react";
import ViewReport from "../components/Report/ViewReport";
import SideBar from "../components/SideBar/SideBar";
import Navbar from "../components/Nav/NavBar"
import Footer from "../components/Footer/Footer";
import './VCPanel.css'

const Report = () => {
    return (
        <>
        <Navbar />
        <div className="vc-panel">
            <SideBar />
            <ViewReport />
        </div>
        <Footer />
        </>   
    )
}

export default Report