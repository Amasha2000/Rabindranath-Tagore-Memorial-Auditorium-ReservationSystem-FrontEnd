import React from 'react';
import './About.css'; 
import aboutUsImg from'../../images/about-us.jpg'

const AboutUs = () => {
  return (
    <div className="about-us-container" id='about-us'>
      <div className="about-us-content">
        <h1 className='about-us-header'>About Us</h1>
        <p>
        The Rabindranath Tagore Memorial Auditorium in University of Ruhuna, gifted
         by the Government of India to Sri Lanka as a symbol of enduring friendship 
         and the cultural heritage between the two countries, is the largest auditorium
         in the Southern Province as well as in any of the Universities in Sri Lanka. 
         Having 1500 seating capacity and equipped with the state-of-the-art  theatre 
         facilities, the Rabindranath Tagore Memorial Auditorium can host national and 
         international aesthetic events, conventions,conferences as well as training 
         programs. Situated close to beach front, it is built following the philosophy 
         of Tropical Modernism of Geoffrey Bawa to make it closely attached to the 
         University of Ruhuna Landscape. Since its ceremonial inauguration in October 2018,
         the Rabindranath Tagore Memorial Auditorium addresses the long standing needs of 
         the University students and public of the Southern Province for having a theatre 
         for hosting aesthetic as well as cultural and academic events.
        </p>
        <div className="about-us">
          <img src={aboutUsImg} alt="img" className="about-us-image" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
