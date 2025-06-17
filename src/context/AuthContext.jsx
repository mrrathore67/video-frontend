// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {

//     const [token, setToken] = useState(localStorage.getItem("token"));
//     const [user, setUser] = useState(() => {
//         const storedUser = localStorage.getItem("user");
//         try {
//             return storedUser ? JSON.parse(storedUser) : null;
//         } catch (e) {
//             console.error("Failed to parse user from localStorage", e);
//             return null;
//         }
//     });


//     const host = "http://localhost:5000";


//     const login = (data) => {
//         localStorage.setItem("token", data.token);
//         setToken(data.token); // this updates the context
//         // setToken(data.token);
//         setUser(data.user);
//         // localStorage.setItem('token', data.token) 
//         localStorage.setItem('user', JSON.stringify(data.user))
//     }

//     const logOut = () => {
//         setToken(null);
//         setUser(null);
//         localStorage.clear();
//     }

//     return (
//         <AuthContext.Provider value={{ token, setToken, user, login, logOut }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Invalid user data in localStorage");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (data) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logOut = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
