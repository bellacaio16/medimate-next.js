'use client'
import React, { useEffect, useState } from 'react'
import UserContext from './userContext';
import { profileService } from '@/services/profileService';

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(undefined);
  
    const fetchUser = async () => {
      try {
        const userData = await profileService();
        console.log("USER PROVIDER: ",userData);
        if(userData?.user){
          await setCurrentUser({
            ...userData.user
          });
        }else{
          
        setCurrentUser(undefined);
        }
        //   console.log("Client: ", user);
      } catch (err) {
        console.log(err);
        setCurrentUser(undefined);
      }
    };
    useEffect(() => {
      fetchUser();
    }, []);
  
    return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>{children}</UserContext.Provider>
  )
}