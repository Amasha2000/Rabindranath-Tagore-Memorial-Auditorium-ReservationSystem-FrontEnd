import React from "react";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import Notification from "../components/Notification/Notification";

const Notifications = () => {
    return (
        <div>
          <Navbar />
          <Notification />
          <Footer />
        </div>
    )
}

export default Notifications