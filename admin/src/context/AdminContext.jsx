import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  const [role, setRole] = useState(''); 

  const Role = sessionStorage.getItem('role');

  console.log(Role)
  console.log(token)
  const Token = Boolean(token);
  const Role1 = Boolean(Role);

  return (
    <AdminContext.Provider value={{ Token, setToken, role, setRole,Role1 }}>
      {children}
    </AdminContext.Provider>
  );
};
