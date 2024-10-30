import React, { useState } from 'react';
import './TermsAndConditions.css';
import terms from '../../images/T&C.pdf'; 
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setAgreed(!agreed);
  };

  const handleFormSubmit = (e) => {
    if (!agreed) {
      e.preventDefault();
      alert('You must agree to the terms and conditions before proceeding.');
    } else {
      alert('You have agreed to the terms and conditions!');
      navigate('/form')
    }
  };

  return (
    <div className="terms-container">
      <h2>Terms and Conditions</h2>

      <iframe 
        src={terms}
        title="Terms and Conditions PDF" 
        className="pdf-viewer"
      />

      <div className="agreement">
        <input 
          type="checkbox" 
          id="agreeCheckbox" 
          checked={agreed} 
          onChange={handleCheckboxChange} 
        />
        <label htmlFor="agreeCheckbox"> I agree to conduct the program subject to the conditions / rules to be followed while 
        using the Rabindranath Tagore Memorial Auditorium.</label>
      </div>

      <button 
        className="submit-btn-terms" 
        onClick={handleFormSubmit} 
        disabled={!agreed}
      >
        Proceed to Reservation
      </button>
    </div>
  );
};

export default TermsAndConditions;
