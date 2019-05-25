import React from "react";
import Tilt from "react-tilt";
import BrainLogo from "./icons8-brain-64.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          <img style={{ height: "120px" }} src={BrainLogo} alt="brain logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
