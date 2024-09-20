import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    c2cUserEmail: '',
    c2cUserId: '',
    role: '',
    favouriteCar: [],
  });

  useEffect(() => {
    const c2cUserEmail = Cookies.get('c2cUserEmail');
    const c2cUserId = Cookies.get('c2cUserId');
    const role = Cookies.get('c2cUserRole') || ''; 
    if (c2cUserEmail && c2cUserId) {
      setUser({
        c2cUserEmail,
        c2cUserId,
        role,
        favouriteCar: [], 
      });
    }
  }, []);

  const updateUser = (updatedUser) => {
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedUser };
      if (newUser.c2cUserEmail !== prevUser.c2cUserEmail) {
        Cookies.set('c2cUserEmail', newUser.c2cUserEmail);
      }
      if (newUser.c2cUserId !== prevUser.c2cUserId) {
        Cookies.set('c2cUserId', newUser.c2cUserId);
      }
      if (newUser.role !== prevUser.role) {
        Cookies.set('c2cUserRole', newUser.role);
      }
      return newUser;
    });
  };

  const clearUser = () => {
    Cookies.remove('c2cUserEmail');
    Cookies.remove('c2cUserId');
    Cookies.remove('c2cUserRole');
    setUser({
      c2cUserEmail: '',
      c2cUserId: '',
      role: '',
      favouriteCar: [],
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
