import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const validateUsername = (username) => {
    if (username.length < 3) {
      return 'Username must be at least 3 characters';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setFormErrors({ ...formErrors, username: validateUsername(value) });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setFormErrors({ ...formErrors, password: validatePassword(value) });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    // Final validation before submitting the form
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError || passwordError) {
      setFormErrors({
        username: usernameError,
        password: passwordError
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post('http://localhost:8080/login', formData, {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded', 
          },
          withCredentials: true
      });

      console.log(response.data);
      const { userName } = response.data;

      localStorage.setItem('userName', userName);
      console.log("User ID stored:", userName);

      navigate('/booking-overview');
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
      }
      alert('SignIn was Unsuccessful. Try Again');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className='background-image'></div>
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            value={username} 
            onChange={handleUsernameChange} 
            placeholder="Username" 
            required
          />
          {formErrors.username && <span className="error">{formErrors.username}</span>}
          
          <input 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
            placeholder="Password" 
            required
          />
          {formErrors.password && <span className="error">{formErrors.password}</span>}
          
          <a href="/forgot-password">Forgot Password?</a>
          <button type='submit'>Sign In</button>
        </form>
        <p>Don't have an account? <a href="/register">Sign Up</a></p>
      </div>
    </div>
  );
};

export default SignIn;
