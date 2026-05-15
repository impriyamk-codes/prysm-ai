"use client";

import { useState } from "react";

import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const currentInput = input;

    const userMessage: Message = {
      role: "user",
      content: currentInput,
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
        }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        role: "assistant",
        content: "Could not connect to Prysm backend.",
        timestamp: getCurrentTime(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleNewChat() {
    setMessages([]);
    setInput("");
    setIsLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <ChatHeader onNewChat={handleNewChat} />

        <section className="mt-10 flex flex-1 flex-col">
          <ChatMessages messages={messages} isLoading={isLoading} />

          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            isLoading={isLoading}
          />
        </section>
      </div>
    </main>
  );
}