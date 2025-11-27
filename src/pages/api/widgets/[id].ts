import type { NextApiRequest, NextApiResponse } from "next";
import { loadWidgets, saveWidgets } from "@/utils/db";
import { Widget } from "@/types/widget";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const widgets = await loadWidgets();

  const widget = widgets.find((w: Widget) => w.id === id);

  if (!widget) {
    return res.status(404).json({ message: "Widget Not Found" });
  }

  if (req.method === "PATCH") {
    const { text } = req.body;

    widget.text = text;

    await saveWidgets(widgets);

    return res.status(200).json(widget);
  }

  if (req.method === "DELETE") {
    const updatedWidgets = widgets.filter((w: Widget) => w.id !== id);

    await saveWidgets(updatedWidgets);

    return res.status(200).json({ message: "Widget Deleted" });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
