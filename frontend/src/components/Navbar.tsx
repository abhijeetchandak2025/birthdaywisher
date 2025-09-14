import React from "react";

import logoImage from "../assets/Cadbury Logo.png";     
import hashtagImage from "../assets/2d logo.png";         
import menuIcon from "../assets/Hamburger.png";           

type NavbarProps = {
  onMenuClick?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <div className="relative z-20 w-full flex items-center justify-between px-6 py-3 bg-purple-900">
      <img src={logoImage} alt="Logo" className="h-8 object-contain" />
      <img src={hashtagImage} alt="Hashtag" className="h-8 object-contain" />
      <img
        src={menuIcon}
        alt="Menu"
        className="h-6 w-6 cursor-pointer"
        onClick={onMenuClick}
      />
    </div>
  );
};

export default Navbar;
