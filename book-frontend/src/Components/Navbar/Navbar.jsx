import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [expandBar, setExpandBar] = useState(false);
  const handleclick = () => {
    setExpandBar(true);
  };
  const handleclose = () => {
    setExpandBar(false);
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 500) {
        setExpandBar(false);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);
  return (
    <div className="navbar">
      <Link to="/">
        <h1>Book List</h1>
      </Link>
      <ul className={expandBar ? "navbar-mobilelist" : "navbar-list"}>
        <div className="cross-image">
          <div></div>
          <CloseIcon onClick={handleclose} />
        </div>
        <Link to="/add" onClick={handleclose}>
          <li>Add Book</li>
        </Link>
        <Link to="/search" onClick={handleclose}>
          {" "}
          <li>Search</li>
        </Link>
        <Link to="/export" onClick={handleclose}>
          <li>Export</li>
        </Link>
      </ul>
      <div className="navbar-hamburger">
        <MenuIcon onClick={handleclick} />
      </div>
    </div>
  );
};

export default Navbar;
