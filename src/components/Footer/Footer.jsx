import React from "react";
import "./Footer.scss";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineFacebook,
} from "react-icons/ai";
import { CgMail } from "react-icons/cg";
import  creditCardImg  from "../../Assets/credit card.png";
function Footer() {
  return (
    <footer className="Footer">
      <div className="container">
        <div className="content">
          <div className="footer-left">
            <h3 className="title">Follow us</h3>
            <ul className="follow">
              <li className="hover-link center">
                <AiOutlineInstagram className="icons" />
              </li>

              <li className="hover-link center">
                <AiOutlineTwitter className="icons" />
              </li>

              <li className="hover-link center">
                <AiOutlineFacebook className="icons" />
              </li>

              <li className="hover-link center">
                <CgMail className="iconss" />
              </li>
            </ul>
          </div>
          <div className="footer-right">
            <h3 className="title">My Company</h3>
            <ul className="company">
              <li className="hover-link">Contact us</li>
              <li className="hover-link">Priavcy Policy</li>
              <li className="hover-link">Retruns & Exchange Policy</li>
              <li className="hover-link">Shpping Policy</li>
              <li className="hover-link">Terms & Conditions</li>
            </ul>
          </div>
        </div>
        <div className="subfooter center">
          <div className="credit-card-img">
            <img src={creditCardImg} alt="Payments Gateway" />
          </div>
          <p className="footer-heading">{""} Copyright { new Date().getFullYear()} © <strong>HYPƎD STORE.</strong></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
