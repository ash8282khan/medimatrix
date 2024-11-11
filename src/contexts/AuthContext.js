// import React, { useContext, useState, useEffect } from 'react';
// import { auth } from '../firebase';

// const AuthContext = React.createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const signup = (email, password) => {
//     return auth.createUserWithEmailAndPassword(email, password);
//   };

//   const login = (email, password) => {
//     return auth.signInWithEmailAndPassword(email, password);
//   };

//   const logout = () => {
//     return auth.signOut();
//   };

//   const resetPassword = (email) => {
//     return auth.sendPasswordResetEmail(email);
//   };

//   const changePassword = (newPassword) => {
//     return currentUser.updatePassword(newPassword);
//   };

//   const updateUserProfile = (data) => {
//     return currentUser.updateProfile(data);
//   };

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     login,
//     signup,
//     logout,
//     resetPassword,
//     changePassword,
//     updateUserProfile
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }


import React, { useContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updatePassword, updateProfile, onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(); // Get the Firebase auth instance

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password); // Updated syntax
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password); // Updated syntax
  };

  const logout = () => {
    return signOut(auth); // Updated syntax
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email); // Updated syntax
  };

  const changePassword = (newPassword) => {
    return updatePassword(currentUser, newPassword); // Updated syntax
  };

  const updateUserProfile = (data) => {
    return updateProfile(currentUser, data); // Updated syntax
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    changePassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
