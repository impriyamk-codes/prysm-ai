export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Prysm</h1>
            <p className="text-sm text-zinc-400">AI Workspace Assistant</p>
          </div>

          <button className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900">
            New Chat
          </button>
        </header>

        <section className="mt-16 flex flex-1 flex-col items-center justify-center text-center">
          <p className="mb-4 rounded-full border border-zinc-800 px-4 py-2 text-sm text-zinc-400">
            Workspace • Memory • Documents • Tasks
          </p>

          <h2 className="max-w-3xl text-5xl font-semibold tracking-tight">
            Your intelligent workspace for learning, building, and organizing.
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-zinc-400">
            Prysm helps students and developers manage projects, understand documents,
            organize tasks, and interact with their workflow using AI.
          </p>

          <div className="mt-10 flex w-full max-w-2xl items-center rounded-2xl border border-zinc-800 bg-zinc-950 p-2">
            <input
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-600"
              placeholder="Ask Prysm anything..."
            />
            <button className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black">
              Send
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}