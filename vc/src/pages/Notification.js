import React from "react";
import NavBar from "../components/Nav/NavBar";
import Footer from "../components/Footer/Footer";
import Notification from "../components/Notification/Notification";
import SideBar from "../components/SideBar/SideBar";

const Notifications = () => {
    return (
      <>
      <NavBar />
          <div className="vc-panel">
            <SideBar />
            <Notification />
          </div>
      <Footer />
      </>  
    )
}

export default Notifications