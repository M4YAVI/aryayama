'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ArrowRight, Loader } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const styles = {
  default: "You are a helpful assistant.",
  oreki: "You are Oreki from Hyouka. Respond in a lazy yet insightful manner, often trying to conserve energy but providing deep observations when necessary.",
  sarcastic: "You are a sarcastic assistant. Respond with wit and irony, often making humorous or mocking remarks.",
};

// List of possible prompt suggestions
const allSuggestions = [
  "Tell me about yourself.",
  "What's the weather like today?",
  "Can you help me with my homework?",
  "Explain quantum physics in simple terms.",
  "Write a short story about a robot.",
  "What are the benefits of meditation?",
  "How do I learn a new language quickly?",
  "Tell me a joke.",
];

// Function to get 3 random suggestions with a seed
const getRandomSuggestions = (seed: number) => {
  const seededRandom = (seed: number) => {
    let value = seed;
    return () => {
      value = (value * 16807) % 2147483647;
      return (value - 1) / 2147483646;
    };
  };

  const random = seededRandom(seed);
  const shuffled = [...allSuggestions].sort(() => random() - 0.5);
  return shuffled.slice(0, 3);
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("default");
  const [suggestionSeed, setSuggestionSeed] = useState(1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  type Message = {
    role: "user" | "assistant";
    content: string;
  };

  // Initialize suggestions on client-side only
  useEffect(() => {
    setIsClient(true);
    setSuggestions(getRandomSuggestions(suggestionSeed));
  }, [suggestionSeed]);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [selectedStyle]);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;
    setIsLoading(true);
    const newUserMessage: Message = { role: "user", content: userMessage };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInput(""); 

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
          style: styles[selectedStyle as keyof typeof styles],
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      const data = await response.json();
      const assistantMessage = data.message;
      setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleRefreshSuggestions = () => {
    setSuggestionSeed(prev => prev + 1);
  };

  const handleDismissSuggestions = () => {
    setShowSuggestions(false);
  };

  const handleStyleChange = (value: string) => {
    setSelectedStyle(value);
  };

  // Only render suggestions on client-side
  const renderSuggestions = () => {
    if (!isClient) return null;
    
    return showSuggestions && (
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, i) => (
          <Card
            key={i}
            className="bg-gray-900 border-gray-800 p-4 hover:bg-gray-800 transition cursor-pointer"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <p className="text-sm">{suggestion}</p>
          </Card>
        ))}
        <Button variant="ghost" size="icon" onClick={handleRefreshSuggestions}>
          <ArrowRight className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleDismissSuggestions}>
          <X className="h-5 w-5" />
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-center">
          <Select value={selectedStyle} onValueChange={handleStyleChange}>
            <SelectTrigger className="w-[200px] bg-transparent border-gray-800">
              <SelectValue placeholder="Choose style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="oreki">Oreki from Hyouka</SelectItem>
              <SelectItem value="sarcastic">Sarcastic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div ref={chatHistoryRef} className="space-y-4 max-h-[500px] overflow-y-auto">
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-gray-400">
              Start chatting by typing a message or selecting a suggestion below!
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-800'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-gray-800 flex items-center gap-2">
                <Loader className="animate-spin h-5 w-5" />
                Thinking...
              </div>
            </div>
          )}
        </div>

        {renderSuggestions()}

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
            className="flex-1 p-2 rounded-lg bg-gray-900 border border-gray-800 focus:outline-none focus:border-blue-500"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button onClick={() => sendMessage(input)} disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </div>
      </main>
    </div>
  );
}