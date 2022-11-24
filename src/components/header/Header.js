import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { sharedContext } from "../../context/UserContext";

const Header = () => {
  const {userSignOut}= useContext(sharedContext);
  return (
    <div className="navbar flex justify-between shadow-md bg-slate-50">
      <div className="flex">
        <Link className="btn btn-ghost normal-case text-xl">daisyUI</Link>
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
        <div>
          <Link to='/login'>
          Login/SignUp
          </Link>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" alt=""/>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link>Settings</Link>
            </li>
            <li>
              <button onClick={userSignOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
