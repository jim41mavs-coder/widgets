import { useWidgets } from "@/hooks/useWidgets";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { Widget } from "@/types/widget";

export default function WidgetItem({ widget }: { widget: Widget }) {
  const { updateWidget, deleteWidget } = useWidgets();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [value, setValue] = useState(widget.text);
  const debouncedValue = useDebounce(value);
  const lastSaved = useRef(widget.text);

  useEffect(() => {
    if (debouncedValue === lastSaved.current) {
      return;
    }

    setIsSaving(true);

    updateWidget.mutate(
      {
        id: widget.id,
        text: debouncedValue,
      },
      {
        onSuccess: () => {
          lastSaved.current = debouncedValue;
          setTimeout(() => setIsSaving(false), 300);
        },
      }
    );
  }, [debouncedValue, widget.id]);

  const onDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      deleteWidget.mutate({ id: widget.id });
    }, 300);
  };

  return (
    <div
      className={`flex items-start gap-2 transition duration-300 ${
        isDeleting ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <button
        className="text-sm text-red-500 hover:text-red-700  px-2 py-1"
        onClick={onDelete}
      >
        Delete
      </button>
      <div className="flex-1">
        <div className="flex items-center h-5 mb-1">
          {isSaving && <span className="text-xs text-gray-500">Saving…</span>}
        </div>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
}
