import { useWidgets } from "@/hooks/useWidgets";
import WidgetItem from "./WidgetItem";
import React from "react";

export function WidgetList() {
  const { widgets, isLoading, addWidget } = useWidgets();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <button
        className="px-4 py-2 rounded border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
        onClick={() => addWidget.mutate()}
      >
        Add Widget
      </button>

      <div className="space-y-3">
        {widgets?.map((widget: any) => (
          <WidgetItem key={widget.id} widget={widget} />
        ))}
      </div>
    </div>
  );
}
