"use client";

import React, { useEffect , useState} from 'react'
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';

const Provider = ({children}) => {
  const { user } = useUser();// This gives you the logged-in user's info directly from Clerk.
 
  
  




  const [userDetail, setUserDetail] = useState();


useEffect(()=>{
  user && CreateNewUser();// if user is falsy(null or undefined), it won't call CreateNewUser and returns user, if user is truthy(valid object), it will call CreateNewUser function to create a new user in your database. and result of CreateNewUser() will be returned

}, [user]);//“Only re-run this useEffect code when the [user] value changes.”

  const CreateNewUser=async()=>{
    const result = await axios.post('/api/user',{
     
      name: user?.fullName ,
      email: user?.primaryEmailAddress?.emailAddress

    }); // This sends: // { name: "User's Full Name", email: "} basically body


    //Axios internally listens for the backend response.When backend sends return NextResponse.json(...), axios catches it.That response is stored in the variable result.



    console.log(result.data);
    setUserDetail(result.data);

  }// post req from front to back 
  return (
    <div>
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      {children} 
      {/* childrens are all components inside <Provider> (usually the entire app pages) */}
    </UserDetailContext.Provider>
     
    </div>
  )
}

export default Provider
