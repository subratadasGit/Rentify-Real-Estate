"use client";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "./button";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./card";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";
import {
  X,
  MessageCircle,
  Send,
  Loader2,
  MessageCircleMore,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";

import LandingSections from "@/components/LandingSections";

export default function Rentify() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef(null);
  const scrollRef = useRef(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error,
  } = useChat({ api: "/api/gemini" });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col">
      <LandingSections />
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              ref={chatIconRef}
              onClick={toggleChat}
              size="icon"
              className="rounded-full size-14 p-2 shadow-lg bg-purple-200 text-purple-800"
            >
              {!isChatOpen ? (
                <MessageCircle className="size-12" />
              ) : (
                <MessageCircleMore className="size-12" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50 w-[95%] md:w-[500px]"
          >
            <Card className="w-96 border-2 rounded-md shadow-lg bg-purple-50 border-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-lg font-bold text-purple-800">Rene</CardTitle>
                <Button
                  onClick={toggleChat}
                  size="icon"
                  variant="ghost"
                  className="px-2 py-0"
                >
                  <X className="size-12 text-purple-800" />
                  <span className="sr-only">Close Chat</span>
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 pr-4">
                  {messages.length > 0 ? (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex gap-2 items-center ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            message.role === "user"
                              ? "bg-purple-600 text-white my-1"
                              : "bg-purple-100 text-purple-800 my-1"
                          }`}
                        >
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code: ({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                              }) => {
                                const match = /language-(\w+)/.exec(
                                  className || ""
                                );
                                return !inline && match ? (
                                  <code
                                    {...props}
                                    className={`text-sm font-mono ${match[1]}`}
                                  >
                                    {children}
                                  </code>
                                ) : (
                                  <pre {...props}>
                                    <code className="text-sm font-mono">
                                      {children}
                                    </code>
                                  </pre>
                                );
                              },
                              ul: ({ children }) => (
                                <ul className="list-disc ml-4">{children}</ul>
                              ),
                              li: ({ children }) => (
                                <li className="list-decimal ml-4 py-2">
                                  {children}
                                </li>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-full mt-32 text-purple-400 items-center justify-center flex gap-3">
                      No messages yet.
                    </div>
                  )}
                  {isLoading && (
                    <div className="w-full mt-32 text-purple-600 items-center justify-center flex gap-3">
                      <Loader2 className="size-8 animate-spin" />
                      <Button onClick={() => stop()} className="underline">
                        Stop
                      </Button>
                    </div>
                  )}
                  {error && (
                    <div className="w-full mt-32 text-purple-600 items-center justify-center flex gap-3">
                      <Button onClick={() => reload()} className="underline">
                        Reload
                      </Button>
                    </div>
                  )}
                  <div ref={scrollRef}></div>
                </ScrollArea>
                <CardFooter className="flex gap-2">
                  <form
                    onSubmit={handleSubmit}
                    className="flex w-full items-center space-x-2"
                  >
                    <Input
                      value={input}
                      className="flex-1 border-purple-500 text-purple-800"
                      placeholder="Type a message..."
                      onChange={handleInputChange}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="size-9"
                      disabled={isLoading}
                    >
                      <Send className="size-4 text-purple-800" />
                    </Button>
                  </form>
                </CardFooter>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
