import { useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || null;
  });

  const login = (username, password) => {
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    const userUsername = import.meta.env.VITE_USER_USERNAME;
    const userPassword = import.meta.env.VITE_USER_PASSWORD;

    // Check if admin
    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin');
      setIsAuthenticated(true);
      setUserRole('admin');
      return { success: true, role: 'admin' };
    }

    // Check if regular user
    if (username === userUsername && password === userPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'user');
      setIsAuthenticated(true);
      setUserRole('user');
      return { success: true, role: 'user' };
    }

    return { success: false, role: null };
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return { isAuthenticated, userRole, login, logout };
};