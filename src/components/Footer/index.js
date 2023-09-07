import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <>
    <ul className="app-icons-container">
      <li className="app-item">
        <FaGoogle size={18} color="#3D3C3C" />
      </li>
      <li className="app-item">
        <FaTwitter size={18} color="#3D3C3C" />
      </li>
      <li className="app-item">
        <FaInstagram size={18} color="#3D3C3C" />
      </li>
      <li className="app-item">
        <FaYoutube size={18} color="#3D3C3C" />
      </li>
    </ul>
    <p className="contact-us-text">Contact us</p>
  </>
)

export default Footer
