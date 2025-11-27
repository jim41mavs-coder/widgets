import { Widget } from "@/types/widget";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

export function useWidgets() {
  const queryClient = useQueryClient();

  const widgetsQuery = useQuery<Widget[]>({
    queryKey: ["widgets"],
    queryFn: async () => {
      const res = await fetch("/api/widgets");
      const data = await res.json();
      return data.widgets;
    },
  });

  const addWidget = useMutation<Widget[]>({
    mutationFn: async () => {
      const res = await fetch("/api/widgets", { method: "POST" });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["widgets"] });
    },
  });

  const updateWidget = useMutation<
    Widget[],
    unknown,
    { id: string; text: string }
  >({
    mutationFn: async ({ id, text }) => {
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

  const deleteWidget = useMutation<
    { message: string },
    unknown,
    { id: string }
  >({
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
