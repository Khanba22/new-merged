"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, MinimizeIcon, MaximizeIcon, X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { useChatbot } from "./chatbot-provider"
import { cn } from "@/lib/utils"

export function Chatbot() {
  const { isOpen, setIsOpen, isMinimized, setIsMinimized } = useChatbot()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm your Tax Assistant. How can I help you today?", isUser: false },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    setMessages((prev) => [...prev, { text: message, isUser: true }])
    setMessage("")

    // Simulate AI response
    setTimeout(() => {
      const response =
        "Thanks for your question about taxes! I can help explain tax concepts, calculate basic deductions, or guide you through your learning journey."
      setMessages((prev) => [...prev, { text: response, isUser: false }])
    }, 1000)
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-4 left-4 z-50"
          >
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg"
              onClick={() => setIsOpen(true)}
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-4 z-50"
          >
            <Card className={cn("bg-gray-900 border-gray-800 shadow-lg w-80", isMinimized ? "h-auto" : "h-96")}>
              <CardHeader className="py-2 px-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-purple-600">
                      <MessageSquare className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-white">Tax Assistant</h3>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-gray-400 hover:text-white"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? <MaximizeIcon className="h-4 w-4" /> : <MinimizeIcon className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-gray-400 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <>
                  <CardContent className="p-3 h-[calc(100%-88px)]">
                    <ScrollArea className="h-full pr-4">
                      <div className="flex flex-col space-y-3">
                        {messages.map((msg, i) => (
                          <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                            <div
                              className={cn(
                                "max-w-[80%] rounded-lg p-2 text-sm",
                                msg.isUser ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-200",
                              )}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>

                  <CardFooter className="p-3 border-t border-gray-800">
                    <div className="flex w-full items-center space-x-2">
                      <Input
                        type="text"
                        placeholder="Ask about taxes..."
                        className="bg-gray-800 border-gray-700 focus-visible:ring-purple-500"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button size="icon" onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

