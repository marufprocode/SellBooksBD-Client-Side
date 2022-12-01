import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { sharedContext } from "../../context/UserContext";
// import useUserRole from "../../hook/useUserRole";

const DashBoardLinks = () => {
  const { user, userRole } = useContext(sharedContext);
  // const [userRole] = useUserRole(user?.email);
  return (
    <>
      {
        user?.uid &&
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      }
      {userRole === "User" && (
        <>
        <li>
          <Link to="/dashboard/my-orders">My Orders</Link>
        </li>
        <li>
          <Link to="/dashboard/my-wishlist">My Wishlist</Link>
        </li>
        </>
      )}
      {userRole === "Seller" && (
        <>
          <li>
            <Link to="/dashboard/my-buyers">My Buyers</Link>
          </li>
          <li>
            <Link to="/dashboard/my-products">My Products</Link>
          </li>
          <li>
            <Link to="/dashboard/add-products">Add Products</Link>
          </li>
        </>
      )}
      {userRole === "Admin" && (
        <>
          <li>
            <Link to="/dashboard/all-buyers">All Buyers</Link>
          </li>
          <li>
            <Link to="/dashboard/all-sellers">All Sellers</Link>
          </li>
          <li>
            <Link to="/dashboard/reported-items">Reported Items</Link>
          </li>
        </>
      )}
    </>
  );
};

export default DashBoardLinks;
