import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        mobile: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const username = localStorage.getItem('userName');
            try {
                const response = await axios.get(`http://localhost:8080/user/${username}`);
                setUserData(response.data);
                setFormData({
                    email: response.data.email,
                    mobile: response.data.mobile
                });
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };
        fetchUserData();
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const username = localStorage.getItem('userName');
        try {
            await axios.put(`http://localhost:8080/user/${username}`, formData);
            alert('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <form>
                <div className="profile-form">
                    <label>Username:</label>
                    <input type="text" value={userData.username || ''} readOnly />
                </div>
                <div className="profile-form">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email || ''} onChange={handleInputChange} readOnly={!isEditing} />
                </div>
                <div className="profile-form">
                    <label>Phone Number:</label>
                    <input type="text" name="mobile" value={formData.mobile || ''} onChange={handleInputChange} readOnly={!isEditing} />
                </div>

                <div className="btn-group">
                    {isEditing ? (
                        <button type="button" onClick={handleFormSubmit} className='save-btn'>Save</button>
                    ) : (
                        <button type="button" onClick={handleEditToggle} className='edit-btn'>Edit Profile</button>
                    )}
                </div>
            </form>
            <button onClick={() => navigate('/forgot-password')} className="reset-password-btn">Reset Password</button>
        </div>
    );
};

export default UserProfile;
