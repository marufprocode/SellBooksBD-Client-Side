import React, { createContext } from 'react';

export const sharedContext = createContext(); 

const UserContext = ({children}) => {

    const contextData = {
        
    }
    return (
        <div>
            <sharedContext.Provider value={contextData}>
                {children}
            </sharedContext.Provider>
        </div>
    );
};

export default UserContext;