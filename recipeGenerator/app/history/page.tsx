
import { getHistoryList } from "@/lib/getHistoryList";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Suspense } from "react";
import { HistoryList } from "@/components/HistoryList"; // 👇 client component
import type { RecipeHistoryType } from '@/types/recipe';


export default async function HistoryPage() {
  const history = await getHistoryList(); // ✅ safe: called inside server component

  return (
    <div className="relative min-h-screen bg-cover bg-center text-white">
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10">
        <ErrorBoundary fallback={<p className="text-red-500 p-4">Failed to load history.</p>}>
          <Suspense fallback={<p className="p-4">Loading...</p>}>
            <HistoryList history={history as RecipeHistoryType[]} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

