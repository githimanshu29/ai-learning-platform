"use client";

import React, { useEffect , useState} from 'react'
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';

const Provider = ({children}) => {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState();


useEffect(()=>{
  user && CreateNewUser();

}, [user]);

  const CreateNewUser=async()=>{
    const result = await axios.post('/api/user',{
     
      name: user?.fullName ,
      email: user?.primaryEmailAddress?.emailAddress

    });

    console.log(result.data);
    setUserDetail(result.data);

  }
  return (
    <div>
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      {children}
    </UserDetailContext.Provider>
     
    </div>
  )
}

export default Provider
