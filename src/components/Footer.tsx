import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>&copy; {new Date().getFullYear()} M360ICT. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
