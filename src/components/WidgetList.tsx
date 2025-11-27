import { useWidgets } from "@/hooks/useWidgets";
import WidgetItem from "./WidgetItem";

export function WidgetList() {
  const { widgets, isLoading, addWidget } = useWidgets();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button
        style={{ border: "1px solid blue" }}
        onClick={() => addWidget.mutate()}
      >
        Add Widget
      </button>

      {widgets?.map((widget: any) => {
        return <WidgetItem key={widget.id} widget={widget} />;
      })}
    </div>
  );
}
