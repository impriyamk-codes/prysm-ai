type ChatInputProps = {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  isLoading: boolean;
};

export function ChatInput({
  input,
  setInput,
  handleSend,
  isLoading,
}: ChatInputProps) {
  return (
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
  );
}