type ChatHeaderProps = {
  onNewChat: () => void;
};

export function ChatHeader({ onNewChat }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prysm</h1>
        <p className="text-sm text-zinc-400">AI Workspace Assistant</p>
      </div>

      <button
        onClick={onNewChat}
        className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
      >
        New Chat
      </button>
    </header>
  );
}