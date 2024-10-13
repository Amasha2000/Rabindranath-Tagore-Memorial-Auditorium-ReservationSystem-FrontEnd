import React from "react";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import SubmissionForm from "../components/Form/SubmissionForm"

const ApplicationForm = () => {
    return (
        <div>
            <Navbar />
            <SubmissionForm />
            <Footer />
        </div>
    )
}

export default ApplicationForm