import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WidgetList } from "@/components/WidgetList";
import { useState } from "react";
import React from "react";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <main className="max-w-3xl mx-auto p-6 space-y-4">
          <header className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Trumpet Widgets</h1>
          </header>

          <WidgetList />
        </main>
      </div>
    </QueryClientProvider>
  );
}
