import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

export function useWidgets() {
  const queryClient = useQueryClient();

  const widgetsQuery = useQuery({
    queryKey: ["widgets"],
    queryFn: async () => {
      const res = await fetch("/api/widgets");
      const data = await res.json();
      return data.widgets;
    },
  });

  const addWidget = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/widgets", { method: "POST" });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["widgets"] });
    },
  });

  const updateWidget = useMutation({
    mutationFn: async ({ id, text }: { id: string; text: string }) => {
      const res = await fetch(`/api/widgets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["widgets"] });
    },
  });

  const deleteWidget = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/widgets/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["widgets"] });
    },
  });

  return {
    widgets: widgetsQuery.data || [],
    isLoading: widgetsQuery.isLoading,
    addWidget: addWidget,
    updateWidget,
    deleteWidget,
  };
}
