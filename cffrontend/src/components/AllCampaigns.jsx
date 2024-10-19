import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsHeartFill } from "react-icons/bs";
import '../styles/AllCampaigns.css';  // Import the updated CSS file

const AllCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate();

    const BASE_URL = "http://127.0.0.1:8000/charity/campaign/";   

    useEffect(() => {
        async function getAllCampaigns() {
        try {
            const camp = await axios.get(BASE_URL);
            console.log(camp.data);
            setCampaigns(camp.data);
        } catch (error) {
            console.log(error);
        }
        }
        getAllCampaigns();
    }, []);

    // Function to handle card click and navigate to CampaignDetail.jsx
    const handleCampaignClick = (campaign) => {
        navigate('/campaign-detail', { state: { campaign } });
    };

    return (
        <div className="all-campaigns-container" id='causes'>
            <header className='all-campaigns-container-header'>
                <h2>Engage with our ongoing charities</h2>
            </header>
            <div className="all-campaigns-content-container">
                {campaigns.map(campaign => (
                    <div
                        key={campaign.id}
                        className="all-campaigns-fundraiser-card"
                        onClick={() => handleCampaignClick(campaign)} 
                    >
                        <div className="all-campaigns-cause-image-container">
                            <img src={campaign.image} alt={campaign.title} />
                            <div className="all-campaigns-donations-count"> 
                                {campaign.total_donations} donations
                            </div>
                        </div>
                        <div className="all-campaigns-fundraiser-info">          
                            <h3 >{campaign.title}</h3>
                            <p>₹{campaign.amount_raised} raised of ₹{campaign.goal}</p>
                            <button className="all-campaigns-donate-btn" onClick={() => handleCampaignClick(campaign)}>
                                Donate Now <BsHeartFill />
                            </button>
                        </div>          
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCampaigns;
