import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import getAccessToken from '../callApi/getAccessToken';
const auth = getAuth(app);

export const sharedContext = createContext(); 

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (name, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        });
    };

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const userSignOut = () => {
        setLoading(true);
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            setUser(null);
            localStorage.removeItem('accessToken');
          })
          .catch((error) => {
            console.error("error", error);
          });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          console.log(user);
          setUser(user);
          setLoading(false);
          if(user?.uid){
            getAccessToken(user?.email);
          }
        });
        return () => unsubscribe();
      }, [user]);


    const contextData = {
      user,
      loading,
      googleSignIn,
      createNewUser,
      updateUserProfile,
      userLogin,
      userSignOut,
    };
    return (
        <div>
            <sharedContext.Provider value={contextData}>
                {children}
            </sharedContext.Provider>
        </div>
    );
};

export default UserContext;