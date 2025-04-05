import { createContext, ReactNode, useState } from "react";

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

const TopicContext = createContext<Topic>({
  user: "67f16411254bfbf96c593e9d",
  title: "Sample Topic Title",
  description: "This is a sample description for today's topic.",
  content: "This is the content of the sample topic.",
  createdAt: "2025-04-05T19:53:40.443Z",
  updatedAt: "2025-04-05T19:53:40.443Z",
  tags: ["sample", "topic", "example"],
  _id: "67f18a447e256ec1796ea1e7",
});

export const TopicProvider = ({ children }: { children: ReactNode }) => {
  const [topic, setTopic] = useState({
    user: "67f16411254bfbf96c593e9d",
    title: "Sample Topic Title",
    description: "This is a sample description for today's topic.",
    content: "This is the content of the sample topic.",
    createdAt: "2025-04-05T19:53:40.443Z",
    updatedAt: "2025-04-05T19:53:40.443Z",
    tags: ["sample", "topic", "example"],
    _id: "67f18a447e256ec1796ea1e7",
  });

  return (
    <TopicContext.Provider value={topic}>{children}</TopicContext.Provider>
  );
};
