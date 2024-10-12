import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        mobile: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/user/signup', formData);
            
            if (response.data.success) {
                localStorage.setItem('userName', formData.username);
            }

        } catch (error) {
            console.error('Error during sign up:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
            />
             <input 
                type="text" 
                name="mobile" 
                value={formData.mobile} 
                onChange={handleChange} 
                required 
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;
