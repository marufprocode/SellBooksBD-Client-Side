import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { sharedContext } from "../../context/UserContext";
import logoImg from "../../assets/logo/bookSky.png";
import NavLinks from "./NavLinks";
import useUserRole from "../../hook/useUserRole";
import sidebarLogo from "../../assets/images/hamburger.png"

const Header = () => {
  const { userSignOut, user } = useContext(sharedContext);
  const [userRole] = useUserRole(user?.email);
  return (
    <div className="navbar flex justify-between shadow-md bg-slate-50 px-7">
      <div className="flex">
        <img src={logoImg} alt="BrandLogo" className="h-[30px]" />
      </div>
      <div className="flex gap-2">
        <div className="flex gap-3">
          <NavLinks/>
        </div>
        {user?.uid && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} alt='userPhoto' />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link className="justify-between">
                  {user?.displayName}
                  <span className="badge">{userRole === 'Admin' ? 'Admin': userRole === 'Seller'? 'Seller':'Profile'}</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={userSignOut}>Logout</button>
              </li>
            </ul>
          </div>
        )}
        <label htmlFor="dashboard-sidebar" className="btn btn-link lg:hidden"><img src={sidebarLogo} alt="MenuIcon" className="w-6 h-6"/></label>
      </div>
    </div>
  );
};

export default Header;
