'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Sparkles, X, RefreshCw, User, Bot, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ChatStyle = "default" | "oreki" | "sarcastic";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const styles: Record<ChatStyle, string> = {
  default: "You are a helpful assistant.",
  oreki: "You are Oreki from Hyouka. Respond in a lazy yet insightful manner, often trying to conserve energy but providing deep observations when necessary.",
  sarcastic: "You are a sarcastic assistant. Respond with wit and irony, often making humorous or mocking remarks.",
};

const allSuggestions: string[] = [
  "Tell me about yourself.",
  "What's the weather like today?",
  "Can you help me with my homework?",
  "Explain quantum physics in simple terms.",
  "Write a short story about a robot.",
  "What are the benefits of meditation?",
  "How do I learn a new language quickly?",
  "Tell me a joke.",
];

// Function to get random suggestions with a seed
const getRandomSuggestions = (seed: number): string[] => {
  const seededRandom = (seed: number): (() => number) => {
    let value = seed;
    return () => {
      value = (value * 16807) % 2147483647;
      return (value - 1) / 2147483646;
    };
  };

  const random = seededRandom(seed);
  const shuffled = [...allSuggestions].sort(() => random() - 0.5);
  return shuffled.slice(0, 4);
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<ChatStyle>("default");
  const [suggestionSeed, setSuggestionSeed] = useState<number>(1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    setSuggestions(getRandomSuggestions(suggestionSeed));
  }, [suggestionSeed]);


  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);


  useEffect(() => {
    setMessages([]);
  }, [selectedStyle]);

  const sendMessage = async (userMessage: string): Promise<void> => {
    if (!userMessage.trim()) return;
    setIsLoading(true);

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newUserMessage: Message = { role: "user", content: userMessage, timestamp };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput("");
    setShowSuggestions(false);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
          style: styles[selectedStyle],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: data.message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsLoading(false);
      }, 500); // Small delay for a natural feel
    } catch (error) {
      console.error("Error:", error);
      setTimeout(() => {
        setMessages([...updatedMessages, {
          role: "assistant",
          content: "Sorry, something went wrong. Try again!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
        setIsLoading(false);
      }, 500);
    }
  };

  const handleSuggestionClick = (suggestion: string): void => {
    sendMessage(suggestion);
  };

  const focusInput = (): void => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <div className="w-full md:max-w-4xl mx-auto flex flex-col h-[80%] p-2">
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black/20 backdrop-blur-sm rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full  flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">
              ChatAI
            </h1>
          </div>
          
          <Tabs defaultValue={selectedStyle} className="w-[270px]" onValueChange={(value) => setSelectedStyle(value as ChatStyle)}>
            <TabsList className="w-full bg-gray-900/50 border border-gray-800">
              <TabsTrigger value="default" className="data-[state=active]:bg-blue-600">
                Default
              </TabsTrigger>
              <TabsTrigger value="oreki" className="data-[state=active]:bg-purple-600">
                Oreki
              </TabsTrigger>
              <TabsTrigger value="sarcastic" className="data-[state=active]:bg-pink-600">
                Sarcastic
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Chat area */}
        <ScrollArea className="flex-1 p-4 overflow-y-auto bg-black/10 backdrop-blur-sm">
          {messages.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center animate-pulse">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Start a conversation
              </h2>
              <p className="text-gray-400 max-w-md">
                Choose a suggestion below or type your own message to begin chatting with the AI.
              </p>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <Avatar className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-white",
                        msg.role === 'user'
                          ? "bg-blue-600"
                          : "bg-gradient-to-br from-purple-600 to-blue-600"
                      )}>
                        {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </Avatar>
                      
                      <div className="space-y-1">
                        <div className={cn(
                          "p-4 rounded-2xl relative",
                          msg.role === 'user'
                            ? "bg-blue-600 text-white rounded-tr-none"
                            : "bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700"
                        )}>
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 px-2">
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-3 max-w-[80%]">
                      <Avatar className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white">
                        <Bot className="h-4 w-4" />
                      </Avatar>
                      
                      <div className="space-y-1">
                        <div className="bg-gray-800 text-gray-100 p-4 rounded-2xl rounded-tl-none border border-gray-700 flex items-center">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>
          )}
        </ScrollArea>
        
        {/* Suggestions area */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-2 pt-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-400">Suggested prompts</h3>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-full hover:bg-gray-800"
                    onClick={() => setSuggestionSeed(prev => prev + 1)}
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-full hover:bg-gray-800"
                    onClick={() => setShowSuggestions(false)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {suggestions.map((suggestion, i) => (
                  <Card
                    key={i}
                    className="bg-gray-900/50 border-gray-800 hover:border-gray-700 p-3 hover:bg-gray-800/50 transition-all cursor-pointer flex items-center group"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <p className="text-sm text-gray-300 flex-1">{suggestion}</p>
                    <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Input area */}
        <div className="pt-2">
          <div className="relative flex items-center">
            <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="py-6 pl-4 pr-12 bg-gray-900/70 border-gray-800 focus-visible:ring-blue-600 text-gray-200 rounded-xl"
              disabled={isLoading}
            />
            <Button
              className="absolute right-2 h-10 w-10 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
