import { createContext, useEffect, useState } from 'react';
import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';

//onAuthStateChanged method, When a user successfully sign in, can get information about the user in the observer

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
