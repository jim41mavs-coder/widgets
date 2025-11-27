import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WidgetList } from "@/components/WidgetList";
import { useState } from "react";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div>
          <h1>Trumpet Widgets</h1>
          <WidgetList />
        </div>
      </div>
    </QueryClientProvider>
  );
}
