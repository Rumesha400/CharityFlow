import './App.css';
import React from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import DemoHome from './components/DemoHome';
import Payment from './components/Payment';
import CampaignDetail from './components/CampaignDetail';
import AllCampaigns from './components/AllCampaigns';
import Thank_You from './components/Thank_You.jsx';
import axios from "axios";
import {useState, useEffect} from "react";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {
  const [campstate, setCamstate ] = useState([])

  useEffect(() =>{
    async function getAllCampaigns() {
      try{
        const camp = await axios.get("http://127.0.0.1:8000/charity/campaign/")
        console.log(camp.data)
        setCamstate(camp.data)
      }
      catch(error){
        console.log(error);
      }
    }
    getAllCampaigns()
  },[])

  return (<>
    <div className='App'>
      <Router>
        <Navbar />
        <div className='mt-19'></div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/payment" element={<Payment />} /> 
          <Route path='/home' element={<DemoHome/>} />
          <Route path='/campaign-detail' element={<CampaignDetail/>} />
          <Route path='/all-campaigns' element={< AllCampaigns/>} />
          <Route path='/thank-you' element={<Thank_You/>} />

          
        </Routes>
      </Router>
      <BackToTop/>
      <Footer />
    </div> 
    </>
  );
}

export default App;
