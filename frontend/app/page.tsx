"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

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
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        role: "assistant",
        content: "Could not connect to Prysm backend.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Prysm</h1>
            <p className="text-sm text-zinc-400">AI Workspace Assistant</p>
          </div>

          <button
            onClick={() => {
              setMessages([]);
              setInput("");
              setIsLoading(false);
            }}
            className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
          >
            New Chat
          </button>
        </header>

        <section className="mt-10 flex flex-1 flex-col">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <p className="mb-4 rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
                Workspace • Memory • Documents • Tasks
              </p>

              <h2 className="max-w-3xl text-5xl font-semibold tracking-tight">
                Your intelligent workspace for learning, building, and organizing.
              </h2>

              <p className="mt-6 max-w-2xl text-lg text-zinc-400">
                Prysm helps students and developers manage projects, understand
                documents, organize tasks, and interact with their workflow using AI.
              </p>
            </div>
          ) : (
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto pb-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-2xl rounded-2xl px-5 py-4 text-sm ${
                    message.role === "user"
                      ? "ml-auto bg-white text-black"
                      : "mr-auto border border-zinc-800 bg-zinc-950 text-zinc-200"
                  }`}
                >
                  {message.content}
                </div>
              ))}

              {isLoading && (
                <div className="mr-auto max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-sm text-zinc-400">
                  Prysm is thinking...
                </div>
              )}
            </div>
          )}

          <div className="mt-auto flex w-full items-center rounded-2xl border border-zinc-800 bg-zinc-950 p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              disabled={isLoading}
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ask Prysm anything..."
            />

            <button
              onClick={handleSend}
              disabled={isLoading}
              className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Thinking" : "Send"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}