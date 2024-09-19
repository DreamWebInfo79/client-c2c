import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    c2cUserEmail: '',
    c2cUserId: '',
    role: '' // Optional role field
  });

  useEffect(() => {
    const c2cUserEmail = Cookies.get('c2cUserEmail');
    const c2cUserId = Cookies.get('c2cUserId');
    const role = Cookies.get('c2cUserRole') || ''; // Fetch role from cookies, if it exists
    if (c2cUserEmail && c2cUserId) {
      setUser({
        c2cUserEmail,
        c2cUserId,
        role // Set role if available
      });
    }
  }, []);

  const saveUserToCookies = (email, id, userRole = '') => {
    Cookies.set('c2cUserEmail', email);
    Cookies.set('c2cUserId', id);
    if (userRole) Cookies.set('c2cUserRole', userRole); // Save role only if provided
    setUser({
      c2cUserEmail: email,
      c2cUserId: id,
      role: userRole // Store role in state
    });
  };

  const clearUser = () => {
    Cookies.remove('c2cUserEmail');
    Cookies.remove('c2cUserId');
    Cookies.remove('c2cUserRole'); // Clear role cookie
    setUser({
      c2cUserEmail: '',
      c2cUserId: '',
      role: '' // Reset role
    });
  };

  return (
    <UserContext.Provider value={{ user, saveUserToCookies, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
