import React, { useContext } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { sharedContext } from '../context/UserContext';
import useUserRole from '../hook/useUserRole';

const AdminRoutes = ({children}) => {
    const {user, loading} = useContext(sharedContext);
    const [userRole, isUserRoleLoading]= useUserRole(user?.email)
    const location = useLocation();
    if (loading || isUserRoleLoading)
      return (
        <div className="min-h-screen flex justify-center items-center">
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        </div>
      );
    if(userRole === 'Admin') return children;
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoutes;