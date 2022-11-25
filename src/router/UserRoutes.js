import React, { useContext } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { sharedContext } from '../context/UserContext';

const UserRoutes = ({children}) => {
    const {user, loading} = useContext(sharedContext);
    const location = useLocation();
    if (loading)
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
    if(user?.uid) return children;
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default UserRoutes;