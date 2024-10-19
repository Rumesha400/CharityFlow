import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import '../styles/Navbar.css';
import BgImage from '../assets/images/homepage-how-it-works-image.jpg';
import Contact_img from '../assets/images/Contact_Image.jpg';
import axios from 'axios';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdPhone } from 'react-icons/md';
import { Mail, MessageCircle, Phone } from 'lucide-react';

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const BASE_URL = "http://127.0.0.1:8000/charity/campaign/";   
  const EMAIL_URL = "http://127.0.0.1:8000/send-email/"; // URL for sending emails


  useEffect(() =>{
    async function getAllCampaigns() {
      try{
        const camp = await axios.get(BASE_URL)
        console.log(camp.data)
        // Sort the campaigns by amount_raised in descending order
        const sortedCampaigns = camp.data.sort((a, b) => b.amount_raised - a.amount_raised);
        setCampaigns(sortedCampaigns);
      }
      catch(error){
        console.log(error);
      }
    }
    getAllCampaigns()

  },[])

  // Function to handle card click and navigate to CampaignDetail.jsx
  const handleCardClick = (campaign) => {
    navigate('/campaign-detail', { state: { campaign } }); // Pass the campaign data as state
  };

  // Function to handle video click and close button
  const onHandleClick = (playState) => {
    setIsPlaying(playState);
  };

  //
  const handleCampaignClick = () => {
    navigate('/all-campaigns')
  }

  //Function to handle the onSubmit EMAIL button  
  // Function to handle the onSubmit EMAIL button  
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(EMAIL_URL, {
        name: fullName,
        email: email,
        message: message,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 'success') {
        setFullName('');
        setEmail('');
        setMessage('');
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        alert(`Error: ${error.response.data.message || 'An unknown error occurred'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response received from the server. Please try again later.');
      } else {
        console.error('Error setting up request:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  //
  const handleCharityFlow =() =>{
    navigate('/all-campaigns')
  }

  return (
    <>
      <div className="image-container">
        <div className="container">    
          <div className="content">
            <h2 className="title">Leading crowdfunding platform</h2>
            <h1>Your home for help</h1>
            <button className="button" onClick={() => {handleCharityFlow()}}>Start a CharityFlow</button>
          </div>
        </div>
      </div>

      <div className="campaign-home-container" id='causes'>
        <header>
          <h2>Engage with our ongoing charities</h2>
        </header>
        <div className="content-container">
          <div className="fundraiser-grid">
            {campaigns.map(campaign => (
              <div
                key={campaign.id}
                className="fundraiser-card"
                onClick={() => handleCardClick(campaign)} 
              >
                <div className="cause-image-container">
                  <img src={campaign.image} alt={campaign.title} />
                  <div className="donations-count"> 
                    {campaign.total_donations} donations
                  </div>
                </div>
                <div className="fundraiser-info">          
                  <h3 className="font-bold">{campaign.title}</h3>
                  
                  <p>₹{campaign.amount_raised} raised of {campaign.goal}</p>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: (campaign.amount_raised / campaign.goal) * 100 }}></div>
                  </div>  
                </div>          
              </div>
            ))}
          </div>
        </div>
        <div className='filter causes'>
          <div className="filter-container">
            <div className="filter-dropdown">
              <button onClick={() => handleCampaignClick()}>See all our charities happening worldwide</button>            
            </div>
          </div>
        </div>

      </div>
    
      {/* <About_Home/> */}
      <div className="about-home-container" id="about">
      <div className="about-home-text">
        <h3>Fundraising on CharityFlow is easy,</h3>
        <h3>powerful, and trusted.</h3>
        <p>
          Get what you need to help your fundraiser succeed on CharityFlow, whether you're raising
          money for yourself, friends, family, or charity. With no fee to start, CharityFlow is the
          world's leading crowdfunding platform—from
          memorial tributes and funerals to
          medical
          emergencies and
          nonprofits. Whenever you need help, you can ask here.
        </p>
        <p>
          Still have
          questions? Learn more about how 
           CharityFlow works.
        </p>
      </div>
    </div>

    {/* <Working_ /> */}
    <div className="working-container" >
      <div className="working-header">
        <h1>How CharityFlow works</h1>
        <button className="learn-more">Learn more</button>
      </div>
      <div className="video-container">
        <img
          src={BgImage}
          alt="Community garden"
          className="image"
        />
        <div className="play-button" onClick={() => onHandleClick(true)}>
          <svg
            xmlns=""
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-play-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M6.283 5.008a.5.5 0 0 0-.686.728l3 2a.5.5 0 0 0 .804-.631l-3-2z" />
          </svg>
          <span>Play 1 min video</span>
        </div>
      </div>
      {isPlaying && (
        <div className="video-modal">
          <div className="video-modal-content">
            <button className="close-button" onClick={() => onHandleClick(false)}>
              <X size={24} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/8EUGN4C33e8?autoplay=1"
              title="CharityFlow Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>

    {/* <Contact_Us/> */}
    <div className="contact-us-block" id='contact'>
      <div className="contact-us-content">
        <h2>Contact us</h2>
        <p>
          We are here to help you and answer any questions you may have. Here is how to reach us!
        </p>
      </div>
      <div className="illustration">
        <div className="envelope"></div>
        <div className="phone">
          <img src={Contact_img} alt='Contact_Us'/>
          <Mail size={24} />
          <MessageCircle size={24} />
          <Phone size={24} />
        </div>        
      </div>
    </div>

    <div className='contact-info-main'>
      <div className="contact-info">
        <p className="contact-info-address">
          CharityFlow Social Ventures India Pvt. Ltd. Nextcoworks JP Nagar - Coworking Space JP Nagar Alankar Plaza, Bk circle, Nayak Layout, 8th Phase, J. P. Nagar, Bangalore, Karnataka, India 560078
        </p>
        <div className="contact-details">
          <a href="mailto:hello@example.com" className="contact-info-email">
            <span className="contact-info-icon"><MdEmail/></span>
            Email:    feedback@charityflow.org
          </a>
          <p className="contact-info-phone">
            <span className="contact-info-icon"><MdPhone/></span>
            +91 123 456 789
          </p>
        </div>
      </div>
    </div>
    
    <div className="form-container" id='feedbacks'>
      <h2 className="form-title">Reach Out to Us and transform lives together</h2>
      <form onSubmit={handleMessageSubmit}>
        <div className="input-group">
          <label htmlFor="fullName">Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="You can type any suggestions or queries you might have. Let us help you!"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Send</button>
      </form>
    </div>
    

    
  </>
  );
};

export default Home;