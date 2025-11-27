import { Widget } from "@/types/widget";
import { loadWidgets, saveWidgets } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const widgets = await loadWidgets();

  if (req.method === "GET") {
    res.status(200).json({ widgets });
  }

  if (req.method === "POST") {
    const newWidget: Widget = {
      id: crypto.randomUUID(),
      text: "",
    };

    widgets.push(newWidget);

    await saveWidgets(widgets);

    return res.status(201).json(newWidget);
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
