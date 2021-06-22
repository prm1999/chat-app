import React, { createContext,useState,useContext,useEffect } from "react";
import { auth, database } from "../misc/firebase";

 const ProfileContext=  createContext();


 export const ProfileProvider=({children })=>{

  const [profile,setProfile]=useState(null);
  // check for already sign in
  const [isLoading,setIsLoading]=useState(true);

  useEffect(() => {

    let userRef;
    const authUnsubscribe= auth.onAuthStateChanged(authobj=>{
      console.log("authobj",authobj);

      if(authobj){

        userRef=database.ref(`/profiles/${authobj.uid}`)


        // retrive data from database 
        userRef.on('value',(snap)=>{
         const {name,createdAt}= snap.val()
         const data={
           name,
           createdAt,
          uid:authobj.uid,
          email:auth.email,
        };
        setProfile(data);
        setIsLoading(false);

        console.log('snapshot',data);

        });

      }
      else{
        if(userRef){
          userRef.off()
        }
        setProfile(null);
        setIsLoading(false);

      }
    });
    return () => {
      authUnsubscribe();

      if(userRef){
        userRef.off();
      }
    }
  }, [])

  
  return(
  <ProfileContext.Provider value={ {isLoading,profile}}>
    {children }
   </ProfileContext.Provider>)
 };

 export const useProfile=()=>useContext(ProfileContext);