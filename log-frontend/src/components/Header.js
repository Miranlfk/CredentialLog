import React from "react";

const Header = () => {
  return (
    <div className="ui fixed menu" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <div className="ui container center">
        <h1 style={{textAlign:"center"}}>Credential Log</h1>
      </div>
    </div>
  );
};

export default Header;
