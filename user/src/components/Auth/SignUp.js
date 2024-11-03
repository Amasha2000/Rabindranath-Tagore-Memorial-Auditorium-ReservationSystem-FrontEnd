import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        mobile: '',
    });

    const [formErrors, setFormErrors] = useState({
        username: '',
        password: '',
        email: '',
        mobile: '',
    });

    const navigate = useNavigate();

    const validateUsername = (username) => {
        if (username.length < 3) {
            return 'Username must be at least 3 characters';
        }
        return '';
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    
        if (password.length < minLength) {
            return 'Password must be at least 8 characters long';
        }
        if (!uppercaseRegex.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!lowercaseRegex.test(password)) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!numberRegex.test(password)) {
            return 'Password must contain at least one digit';
        }
        if (!specialCharRegex.test(password)) {
            return 'Password must contain at least one special character';
        }
    
        return '';
    };    

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Invalid email format';
        }
        return '';
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(mobile)) {
            return 'Mobile number must be exactly 10 digits';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let error = '';
        switch (name) {
            case 'username':
                error = validateUsername(value);
                break;
            case 'password':
                error = validatePassword(value);
                break;
            case 'email':
                error = validateEmail(value);
                break;
            case 'mobile':
                error = validateMobile(value);
                break;
            default:
                break;
        }

        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: error });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const usernameError = validateUsername(formData.username);
        const passwordError = validatePassword(formData.password);
        const emailError = validateEmail(formData.email);
        const mobileError = validateMobile(formData.mobile);

        if (usernameError || passwordError || emailError || mobileError) {
            setFormErrors({
                username: usernameError,
                password: passwordError,
                email: emailError,
                mobile: mobileError,
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/user/signup', formData);
            if (response.data.success) {
                localStorage.setItem('userName', formData.username);
                navigate('/booking-overview');
            }
        } catch (error) {
            console.error('Error during sign up:', error);
            alert('Sign up was unsuccessful. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className='background-image'></div>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        placeholder="Username" 
                        required 
                    />
                    {formErrors.username && <span className="error">{formErrors.username}</span>}
                    
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Password" 
                        required 
                    />
                    {formErrors.password && <span className="error">{formErrors.password}</span>}
                    
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Email" 
                        required 
                    />
                    {formErrors.email && <span className="error">{formErrors.email}</span>}
                    
                    <input 
                        type="text" 
                        name="mobile" 
                        value={formData.mobile} 
                        onChange={handleChange} 
                        placeholder="Mobile" 
                        required 
                    />
                    {formErrors.mobile && <span className="error">{formErrors.mobile}</span>}
                    
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already registered? <a href="/login">Log In</a></p>
            </div>
        </div>
    );
};

export default SignUp;
