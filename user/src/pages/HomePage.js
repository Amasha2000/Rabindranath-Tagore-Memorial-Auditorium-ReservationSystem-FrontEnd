import React from "react";
import NavbarUser from "../components/Nav/NavbarUser";
import Footer from "../components/Footer/Footer";
import Home from "../components/Home/Home";
import AboutUs from "../components/AboutUS/About";
import PastEvent from "../components/PastEvents/PastEvent";
import Location from "../components/Location/Location";
import UpcomingEvent from "../components/UpcomingEvent/UpcomingEvent";

const HomePage = () => {
    return (
        <div>
            <NavbarUser />
            <Home />
            <AboutUs />
            <UpcomingEvent />
            <PastEvent />
            <Footer />
            <Location />
        </div>
    )
}

export default HomePage