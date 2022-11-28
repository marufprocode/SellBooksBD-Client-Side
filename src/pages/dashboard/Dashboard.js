import React, { useContext } from 'react';
import { sharedContext } from '../../context/UserContext';
import dahsboardImg from '../../assets/images/Dashboard-cut.png'
import useUserRole from '../../hook/useUserRole';

const Dashboard = () => {
    const {user} = useContext(sharedContext);
    const [userRole] = useUserRole(user?.email);
    return (
        <div>
            <div className='text-center pt-3 font-poppins'>
            <h3 className=''>Welcome <strong className='text-teal-900'>{user?.displayName}!</strong> to Dashboard</h3>
            <p className='text-lg'><strong>Email: </strong>{user?.email}</p>
            <p className='text-lg'><strong>Account Type: </strong>{userRole}</p>
            </div>
            <img src={dahsboardImg} alt="dashboardImage" className='px-5 md:px-36 py-10'/>
        </div>
    );
};

export default Dashboard;