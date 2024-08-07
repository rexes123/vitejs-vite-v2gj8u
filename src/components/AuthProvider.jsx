//create Context
//export const authContext = createContext();

//Provide context
// export function AuthProvider({ children }){
// const [user, setUser] = useState(null);

// useEffect(() => {
//   //observer
//   return auth.onAuthStateChanged((user) => {
//     setUser(user);
//   });
// });

// return <AuthContext.Provider value={{ user }}>
// {children}
// </AuthContext.Provider>;
// }

//use context
import { createContext, useState, useEffect } from 'react';
// import { auth } from '../firebase';

//Create context
export const AuthContext = createContext();

//Provide context
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // return auth.onAuthStateChanged((user) => {
    //   setUser(user);
    // });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
