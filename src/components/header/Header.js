import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { sharedContext } from "../../context/UserContext";
import logoImg from "../../assets/logo/bookSky.png";
import NavLinks from "./NavLinks";
import DashBoardLinks from "../shared/DashBoardLinks";
import useUserRole from "../../hook/useUserRole";

const Header = () => {
  const { userSignOut, user } = useContext(sharedContext);
  const [userRole] = useUserRole(user?.email);
  return (
    <div className="navbar flex justify-between shadow-md bg-slate-50 px-7">
      <div className="flex">
        <img src={logoImg} alt="BrandLogo" className="h-[30px]" />
      </div>
      <div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
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
              <DashBoardLinks/>
              <li>
                <Link>Settings</Link>
              </li>
              <li>
                <button onClick={userSignOut}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
