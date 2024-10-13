import React from "react";
import Navbar from "../components/Nav/Navbar";
import Footer from "../components/Footer/Footer";
import PaymentWorkFlow from "../components/PaymentWorkFlow/PaymentWorkflow";

const PaymentWorkflow = () => {
    return (
        <div>
            <Navbar />
            <PaymentWorkFlow />
            <Footer />
        </div>
    )
}

export default PaymentWorkflow