type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
};

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  if (messages.length === 0) {
    return (
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
    );
  }

  return (
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
  );
}