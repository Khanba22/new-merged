"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useAuth from "./auth-context";

interface Topic {
  user: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  _id: string;
}

const TopicContext = createContext<Topic | null>(null);

export const TopicProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuth();
  const [topic, setTopic] = useState(null);

  const getTodaysTopic = async () => {
    console.log(user,"Topic Extractor USER");

    if (!user) {
      return;
    }
    if (topic) return;
    const res = await fetch("/api/generate-todays-topic", {
      method: "POST",
      body: JSON.stringify({ id: user._id }),
    });
    const data = await res.json();
    console.log(data);
    setTopic(data);
  };

  useEffect(() => {
    
    getTodaysTopic();
  }, [user]);

  return (
    <TopicContext.Provider value={topic}>{children}</TopicContext.Provider>
  );
};

const useTopic = () => {
  const topic = useContext(TopicContext);
  return topic;
};
export default useTopic;
