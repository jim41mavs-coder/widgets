import { readFile, writeFile } from "fs/promises";

const DB_PATH = "./db.json";

export async function loadWidgets() {
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

export async function saveWidgets(widgets: any) {
  const data = { widgets };

  await writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}
