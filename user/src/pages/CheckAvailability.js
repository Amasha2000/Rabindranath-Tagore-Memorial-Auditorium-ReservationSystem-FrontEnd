import React from "react";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import AvailabilityCalendar from "../components/Calendar/AvailabilityCalendar";

const CheckAvailability = () => {
    return (
        <div>
            <Navbar />
            <AvailabilityCalendar />
            <Footer/>
        </div>
    )
}

export default CheckAvailability