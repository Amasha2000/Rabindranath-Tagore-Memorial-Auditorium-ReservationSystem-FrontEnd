import React from "react";
import ApplicationForm from "../components/Form/ApplicationForm"

import Navbar from "../components/Nav/Navbar";

import './AdminPanel.css';

const Form = () => {
    return (
        <div >
            <Navbar />
            <ApplicationForm />
        </div>  
    )
}

export default Form