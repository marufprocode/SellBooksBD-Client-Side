import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { sharedContext } from "../../context/UserContext";

const NavLinks = () => {
  const { user } = useContext(sharedContext);
  return (
    <>
      <div className="w-full">
        <NavLink to="/home" className="w-full">Home</NavLink>
      </div>
      <div className="w-full">
        <NavLink to="/blogs" className="w-full">Blogs</NavLink>
      </div>
      <div className={`${user?.uid ? "hidden" : "w-full"}`}>
        <NavLink to="/login" className='w-full'>Login</NavLink>
      </div>
    </>
  );
};

export default NavLinks;
