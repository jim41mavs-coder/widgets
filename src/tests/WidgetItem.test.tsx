import { render, screen, fireEvent, act } from "@testing-library/react";
import WidgetItem from "@/components/WidgetItem";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.useFakeTimers();
const mockMutate = jest.fn();
const mockDelete = jest.fn();

jest.mock("@/hooks/useWidgets", () => ({
  useWidgets: () => ({
    updateWidget: { mutate: mockMutate },
    deleteWidget: { mutate: mockDelete },
  }),
}));

function renderWithQueryProvider(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

test("debounced autosave fires after typing stops", async () => {
  renderWithQueryProvider(<WidgetItem widget={{ id: "1", text: "" }} />);

  const textarea = screen.getByRole("textbox");

  fireEvent.change(textarea, { target: { value: "Hello" } });

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(mockMutate).toHaveBeenCalledWith(
    expect.objectContaining({ id: "1", text: "Hello" }),
    expect.anything()
  );
});

test("deletes widget with id on delete button click", () => {
  renderWithQueryProvider(<WidgetItem widget={{ id: "2", text: "Test" }} />);

  const deleteButton = screen.getByText("Delete");
  fireEvent.click(deleteButton);

  expect(mockDelete).toHaveBeenCalledWith(expect.objectContaining({ id: "2" }));
});
