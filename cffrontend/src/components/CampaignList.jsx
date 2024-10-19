// CampaignsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/charity/campaign/')  // Adjust the API URL to match Django backend
      .then(response => setCampaigns(response.data))
      .catch(error => console.error('Error fetching campaigns:', error));
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Campaigns</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="border rounded-lg shadow-lg p-4">
            <img src={campaign.image_url} alt={campaign.title} className="w-full h-40 object-cover rounded" />
            <h3 className="font-semibold mt-4">{campaign.title}</h3>
            <p>{campaign.donations} donations</p>
            <p>€{campaign.amount_raised} raised</p>
            <a href={`/campaigns/${campaign.slug}`} className="text-blue-500 mt-2">View Campaign</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignsList;
