import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { sharedContext } from "../../context/UserContext";

const NavLinks = () => {
  const { user } = useContext(sharedContext);
  return (
    <>
      <div>
        <NavLink to="/home">Home</NavLink>
      </div>
      <div>
        <NavLink to="/blogs">Blogs</NavLink>
      </div>
      <div className={`${user?.uid ? "hidden" : ""}`}>
        <NavLink to="/login">Login</NavLink>
      </div>
    </>
  );
};

export default NavLinks;
