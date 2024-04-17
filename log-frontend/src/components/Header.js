//This applications header component
import React from "react";

const Header = () => {
  return (
    <div className="ui fixed menu" style={{display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"#393E46"}}>
      <div className="ui container center">
                <h1 style={{textAlign:"center", color:"white"}}><a href="/" style={{color:"white"}}>Credential Log</a></h1>
      </div>
    </div>
  );
};

export default Header;
