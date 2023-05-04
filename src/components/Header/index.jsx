import React from "react";
import { Link } from "react-router-dom";
import "./header.css"

function Header() {
  return (
    <>
      <div className="header header_container">
        <Link to={"/"}>COUNTRIES LIST</Link>
      </div>
    </>
  );
}

export default Header;
