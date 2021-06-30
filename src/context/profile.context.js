import React, { createContext, useState, useContext, useEffect } from 'react';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';

 export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  // check for already sign in
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;

    let userStatusRef;

    const authUnsubscribe = auth.onAuthStateChanged(authobj => {
      // console.log('authobj', authobj);

      if (authobj) {
        console.log(authobj.uid)
        userStatusRef = database.ref(`/status/${authobj.uid}`);

        userRef = database.ref(`/profiles/${authobj.uid}`);

        // retrive data from database
        userRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            avatar,
            createdAt,
            uid: authobj.uid,
            email: auth.email,
          };
          setProfile(data);
          setIsLoading(false);

          console.log('snapshot', data);
        });

        database
          .ref('.info/connected')
          .on('value', snapshot => {
            // If we're not currently connected, don't do anything.
            if (!!snapshot.val() === false) {
              return;
            }

            userStatusRef
              .onDisconnect()
              .set(isOfflineForDatabase)
              .then(() => {
               
                userStatusRef.set(isOnlineForDatabase);
              });
          });
      } else {
        if (userRef) {
          userRef.off();
        }
        if (userStatusRef) {
          userStatusRef.off();
        }

        database.ref('.info/connected').off();


        setProfile(null);
        setIsLoading(false);
      }
    });
    return () => {
      authUnsubscribe();
      database.ref('.info/connected').off();

      if (userRef) {
        userRef.off();
      }
      if (userStatusRef) {
        userStatusRef.off();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
