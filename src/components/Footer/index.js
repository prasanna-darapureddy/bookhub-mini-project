import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <>
    <div className="footer-container">
      <div className="social-media-icons-container">
        <button type="button" className="social-icon-btn">
          <FaGoogle className="social-icon" />
        </button>
        <button type="button" className="social-icon-btn">
          <FaTwitter className="social-icon" />
        </button>
        <button type="button" className="social-icon-btn">
          <FaInstagram className="social-icon" />
        </button>
        <button type="button" className="social-icon-btn">
          <FaYoutube className="social-icon" />
        </button>
      </div>
      <p className="contact-us-text">Contact us</p>
    </div>
  </>
)
export default Footer
