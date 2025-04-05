"use client";

import { createContext, useContext, useEffect, useState } from "react";

const dummyAchievements = [
  {
    id: "wildfire",
    name: "Wildfire",
    desc: "Reach a 3 day streak",
    progress: 33,
    level: 1,
    icon: "🔥",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "sage",
    name: "Sage",
    desc: "Earn 100 XP",
    progress: 12,
    level: 1,
    icon: "🧠",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "scholar",
    name: "Scholar",
    desc: "Learn 50 new tax terms in a single course",
    progress: 2,
    level: 1,
    icon: "📜",
    color: "from-red-500 to-pink-500",
  },
]

interface AuthContextProps {
  children: React.ReactNode;
}

interface User {
  _id: string;
  name: string;
  email: string;
  streak: number;
  level: number;
  points: number;
  badges: string[];
  achievements: any[];
  createdAt: {
    $date: string;
  };
  __v: number;
}

const AuthContext = createContext<User>({
  _id: "67f1902fdb12b94843667d02",
  name: "John Doe",
  email: "test@gmail.com",
  streak: 1,
  level: 1,
  points: 100,
  badges: [],
  achievements: dummyAchievements,
  createdAt: {
    $date: "2025-04-05T16:57:17.626Z",
  },
  __v: 0,
});

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [profile, setProfile] = useState({
    _id: "67f1902fdb12b94843667d02",
    name: "John Doe",
    email: "test@gmail.com",
    streak: 2,
    level: 1,
    points: 100,
    badges: [],
    achievements: dummyAchievements,
    createdAt: {
      $date: "2025-04-05T16:57:17.626Z",
    },
    __v: 0,
  });

  useEffect(()=>{
    const fetchProfile = async()=>{
      if(!profile) return;
      const res = await fetch(`/api/profile/${profile._id}`)
      const data = await res.json();
      console.log("Fetched Profile",data)
      setProfile(data)
    }
    fetchProfile()
  },[profile._id])

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
