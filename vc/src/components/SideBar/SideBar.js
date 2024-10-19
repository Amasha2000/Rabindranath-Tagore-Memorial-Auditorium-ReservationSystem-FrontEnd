import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCalendarAlt, faChartBar } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/vc-dashboard"><i className="icon-dashboard"><FontAwesomeIcon icon={faTachometerAlt} /></i> Dashboard</Link></li>
                <li><Link to="/event-calendar"><i className="icon-calendar"><FontAwesomeIcon icon={faCalendarAlt} /></i> Event Calendar</Link></li>
                <li><Link to="/reports"><i className="icon-reports"><FontAwesomeIcon icon={faChartBar} /></i> Reports</Link></li>
                </ul>
        </div>
    );
};

export default SideBar;
