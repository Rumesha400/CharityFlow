import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/CampaignDetail.css';

const CampaignDetail = () => {
  // Scroll to the top of the page when the component loads
  window.scrollTo(0, 0);

  const location = useLocation();
  const { campaign } = location.state;  // Accessing the campaign data passed via state

  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [copiedLink, setCopiedLink] = useState(window.location.href); // Initialize with the current URL
  const [linkCopied, setLinkCopied] = useState(false); // State to manage link copied status
  const navigate = useNavigate();

  const handleShareClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setLinkCopied(false); // Reset the link copied status
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(copiedLink) // Copy the displayed link
      .then(() => {
        setLinkCopied(true); // Set the link copied status to true
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleDonateClick =() =>{
    navigate('/payment', {state : { campaign }})
  }

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="charity-container">
        <h1 className="charity-title">{campaign.title}</h1>
        <div className="charity-content">
          <div className="charity-image-container">
            <img src={campaign.image} alt="Campaign" className="charity-image" />
            <div className="organizer-info">
              <span className="organizer-text">Your donation empowers those in need.</span>
            </div>
            <span className="donation-protected">Donation protected</span>
          </div>
          <div className="charity-details">
            <div className="donation-progress">
              <div className="donation-amounts">
                <span className="amount-raised">₹{campaign.amount_raised.toLocaleString()}</span>
                <span className="amount-goal">raised of ₹{campaign.goal.toLocaleString()} goal</span> 
              </div>
            </div>
            <div className="donation-count">{campaign.total_donations.toLocaleString()} donations</div>
            <button className="campaign-detail-button share-button" onClick={handleShareClick}>Share</button>
            <button className="campaign-detail-button donate-button" onClick={handleDonateClick}>Donate now</button>
          </div>
        </div>
      </div>

      <div>
        {/* Add the description section here */}
        <div className="charity-description">
          <h2>Story Behind</h2>
          <p>{campaign.description}</p>
        </div>
      </div>

      {/* Modal for sharing the link */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Share this Campaign</h2>
            <p>Click the button below to copy the link:</p>
            <button className="campaign-detail-button" onClick={handleCopyLink}>Copy Link</button>
            {/* Textbox displaying the copied link */}
            <input
              type="text"
              value={copiedLink}
              readOnly
              className="copied-link-input"
              placeholder="Link will appear here"
            />
            {/* Text indicating link has been copied */}
            {linkCopied && <p className="link-copied-text">Link copied to clipboard!<br/> 
              Share this with all your contacts to reach the goal.
              </p>}
            <button className="campaign-detail-button" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CampaignDetail;
