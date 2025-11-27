import { Widget } from "@/types/widget";
import { readFile, writeFile } from "fs/promises";

const DB_PATH = "./db.json";

interface DBShape {
  widgets: Widget[];
}

export async function loadWidgets(): Promise<Widget[]> {
  try {
    const data = await readFile(DB_PATH, "utf-8");
    return JSON.parse(data)?.widgets || [];
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return [];
    }
    throw error;
  }
}

export async function saveWidgets(widgets: Widget[]): Promise<void> {
  const data = { widgets };

  await writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}
