import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DemoHome.css';
import PayPal_Logo from '../assets/images/PayPal_logo.png';
import Paytm_Logo from '../assets/images/Paytm_logo.png';
import CreditCard_Logo from '../assets/images/CreditCard_logo.png'
import Ukraine_background from '../assets/images/Ukraine_background.jpg';
import Ukrainian_Armed from '../assets/images/Ukrainian_Armed_Forces_logo.jpg';
import Ukrain_Flag from '../assets/images/Ukraine_Flag_brush_background.png';
import Ministry from '../assets/images/Ministry_of_Digital_Transformation_logo.png';

function DemoHome() {
  return (
    <div className="App">   
      
      <Banner />
      <About />
      <Idea />
      <Donation />
      <Partners />
      <Feedbacks />
    </div>
  );
}

// function Nav() {
//   return (
//     <Navbar />
//   );
// }

function Banner() {
  return (
    <section className="banner">
      <img src={Ukraine_background} alt="army background" />
      <div className="content">
        <h2>Support Armed Forces of Ukraine</h2>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="contentBx">
        <h2 className="heading">About Us</h2>
        <p className="text">
          <b>On February 24, 2022, Russia initiated a military invasion of Ukraine.</b><br /><br />
          <a className="nav-button" href="https://en.wikipedia.org/wiki/2022_Russian_invasion_of_Ukraine" target="_blank" rel="noreferrer">Read more on Wikipedia</a>
          <br /><br />
          <b>We are a charitable organization based in Lviv, Ukraine, dedicated to supporting our army.<br/> We need your assistance!</b>
        </p>
      </div>
      <div className="imgBx"></div>
      <div className="imgBx1"></div>
    </section>
  );
}

function Idea() {
  return (
    <section className="idea" id="idea">
      <h2 className="heading">Our Idea</h2>
      <p className="text">Support your Orange County Firefighters by donating. On Thursday, September 19, eight members of our OCFA Handcrew were returning from fighting the Airport Fire when they were involved in a rollover accident on a freeway in Irvine. Eight firefighters sustained injuries, with six critically injured and taken to nearby hospitals.

The Orange County Professional Firefighters Association, Local 3631, in collaboration with the Orange County Fire Authority, is committed to ensuring that these brave members and their families receive the care and resources they need for their long journey to recovery.

We appreciate the support from our communities. Please keep our firefighters and their families in your thoughts and prayers.</p>
    </section>
  );
}

function Donation() {
    return (
      <section className="donation" id="donation">
        <div className="background">
          <img src={Ukrain_Flag} alt="Ukraine flag brush background" />
        </div>
        <h2 className="heading">Make Donation</h2>
        <div className="container">
          <DonationCard number="01" logo={PayPal_Logo} title="Paypal" />
          <DonationCard number="02" logo={Paytm_Logo} title="Paytm" />
          <DonationCard number="03" logo={CreditCard_Logo} title="Credit Card" />
        </div>
      </section>
    );
  }
  
  

function DonationCard({ number, logo, title }) {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate('/payment');  // Redirect to the Payment page
  };

  return (
    <div className="donation-container">
      <div className="card">
        <div className="box">
          <h2>{number}</h2>
          <div className="content">
            <img src={logo} alt={title} />
            <h3>{title}</h3>
            <button onClick={handleDonateClick}><a href=''>Donate</a></button>
          </div>
        </div>
      </div>
    </div>
  );
}


function Partners() {
  return (
    <section className="partners" id="partners">
      <h2 className="heading">Our Partners</h2>
      <p className="text">
      Defending Our Homeland with Honor. This embodies the mission to protect the nation, uphold democratic ideals, and ensure the safety and freedom of the Ukrainian people.
      </p>
      <div className="imgBx">
        <a className="ministrydefence" href="https://www.mil.gov.ua/en/">
          <img src={Ukrainian_Armed} alt="Ukrainian Armed Forces logo" />
        </a>
        <a className="ministrydigital" href="https://thedigital.gov.ua/">
          <img src={Ministry} alt="Ministry of Digital Transformation logo" />
        </a>
      </div>
    </section>
  );
}

function Feedbacks() {
  return (
    <section className="feedbacks" id="feedbacks">
      <h2 className="heading">What People Say</h2>
      <div className="container">
        <FeedbackItem name="Sharie" />
      </div>
    </section>
  );
}

function FeedbackItem({ name }) {
  return (
    <div className="contentBx">
      <p>We are with, sisters!</p>
      <h3>{name}</h3>
    </div>
  );
}



export default DemoHome;
