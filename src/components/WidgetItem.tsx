import { useWidgets } from "@/hooks/useWidgets";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import React from "react";

export default function WidgetItem({ widget }: any) {
  const { updateWidget, deleteWidget } = useWidgets();

  const [value, setValue] = useState(widget.text);
  const debouncedValue = useDebounce(value);
  const lastSaved = useRef(widget.text);

  useEffect(() => {
    if (debouncedValue === lastSaved.current) {
      return;
    }
    updateWidget.mutate(
      {
        id: widget.id,
        text: debouncedValue,
      },
      {
        onSuccess: () => {
          lastSaved.current = debouncedValue;
        },
      }
    );
  }, [debouncedValue, widget.id]);

  return (
    <div style={{ display: "flex" }}>
      <button onClick={() => deleteWidget.mutate({ id: widget.id })}>
        Delete
      </button>
      <textarea
        style={{
          border: "1px solid black",
          margin: "16px",
          padding: "16px",
          width: "100%",
        }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
}
