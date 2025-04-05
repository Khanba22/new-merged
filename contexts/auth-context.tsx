"use client";

import { createContext, useContext, useState } from "react";

interface AuthContextProps {
  children: React.ReactNode;
}

interface User {
  _id: string;
  name: string;
  email: string;
  streak: string;
  level: string;
  points: string;
  badges: string[];
  achievements: string[];
  createdAt: {
    $date: string;
  };
  __v: number;
}

const AuthContext = createContext<User>({
  _id: "12345",
  name: "John Doe",
  email: "test@gmail.com",
  streak: "0",
  level: "1",
  points: "0",
  badges: [],
  achievements: [],
  createdAt: {
    $date: "2025-04-05T16:57:17.626Z",
  },
  __v: 0,
});

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [profile, setProfile] = useState({
    _id: "12345",
    name: "John Doe",
    email: "test@gmail.com",
    streak: "0",
    level: "1",
    points: "0",
    badges: [],
    achievements: [],
    createdAt: {
      $date: "2025-04-05T16:57:17.626Z",
    },
    __v: 0,
  });

  return (
    <AuthContext.Provider value={{ ...profile }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export default useAuth;
