// components/Sidebar.tsx

import { RecipeHistoryType } from "@/types/recipe";

export function Sidebar({ history }: { history: RecipeHistoryType[] }) {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="font-bold text-lg mb-4">Recipe History</h2>
      <ul className="space-y-2">
        {history.map((item) => (
          <li key={item._id} className="truncate text-sm">
            🍽️ {item.title}
          </li>
        ))}
      </ul>
    </aside>
  );
}
