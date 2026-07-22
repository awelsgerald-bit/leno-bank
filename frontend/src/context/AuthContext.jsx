import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Demo user default with 'admin' role
  const [user, setUser] = useState({
    id: '1',
    name: 'Charlie',
    email: 'charlie@test.com',
    accountNumber: '5959504955',
    role: 'admin', // Set to 'admin' or 'user'
  });
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(user);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}