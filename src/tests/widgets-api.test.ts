import handler from "../pages/api/widgets";
import { loadWidgets, saveWidgets } from "../utils/db";

jest.mock("../utils/db");

test("GET /api/widgets returns widgets from the database", async () => {
  (loadWidgets as jest.Mock).mockResolvedValue([
    { id: "1", text: "first widget" },
    { id: "2", text: "second widget" },
  ]);

  const req = { method: "GET" } as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;

  await handler(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    widgets: [
      { id: "1", text: "first widget" },
      { id: "2", text: "second widget" },
    ],
  });
});
