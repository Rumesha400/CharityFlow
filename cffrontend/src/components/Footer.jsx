import '../styles/Footer.css';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaTwitter } from 'react-icons/fa';


import React from 'react'

const Footer = () => {
  return (
    <>
    
{/* <Footer /> */}
<footer className="footer">
<hr/>
  <div className="footer-container">
    <div className="footer-left">
      
      <a href="/" className="footer-logo">Charity Flow</a>
      <ul className="footer-links">
        <a href="/terms">Terms of Use</a>
        <a href="/privacy">Privacy policy</a>
        <a href="/cookies">Cookie policy</a>
        <a href="/accessibility">Accessibility Statement</a>
      </ul>
      <p className="copyright">
        CharityFlow.com trading as Charity is authorised and regulated by the Financial Conduct Authority (FCA) under the Payment Service Regulations 2017.
        <br />
        Registration number: XXXXXX
        <br />
        Contains OS and National Statistics data © Crown copyright and database right (2018). Contains Royal Mail data © Royal Mail copyright and database right (2018).
        <br />
        <br />
        <br />
          @Created by Rumesha Ansari          
      </p>
    </div>
    <div className="footer-home-right">
      <p>Find us on</p>
      <br />
      <ul className="social-links">
      <li><a href="https://www.facebook.com/charityflow/"><FaFacebookF /></a></li>
        <li><a href="https://www.instagram.com/charityflow/"><FaInstagram /></a></li>
        <li><a href="https://www.youtube.com/channel/UCHOOLdfpyMB5FthJ7uigRSA"><FaYoutube /></a></li>
        <li><a href="https://www.linkedin.com/company/charityflow"><FaLinkedinIn /></a></li>
        <li><a href="https://x.com/charityflow?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor&mx=2"><FaTwitter /></a></li>
      </ul>
    </div>
  </div>
</footer>

    
    
    </>
  )
}

export default Footer
