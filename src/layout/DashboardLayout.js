import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import DashBoardLinks from '../components/shared/DashBoardLinks';

const DashboardLayout = () => {
    return (
        <div>
      {/* <DeleteDoctorModal/> */}
      <Header />
      <div className="drawer drawer-mobile">
        <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet/>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <DashBoardLinks/>
          </ul>
        </div>
      </div>
    </div>
    );
};

export default DashboardLayout;