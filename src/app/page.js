import TaskBoard from "@/components/TaskBoard";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-1">My Tasks</h1>
      <p className="text-gray-500 text-sm mb-8">keep track of stuff you need to do</p>
      <TaskBoard />
    </main>
  );
}
