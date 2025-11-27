import { fireEvent, render, screen } from "@testing-library/react";
import { WidgetList } from "@/components/WidgetList";
import React from "react";

const mockAddMutate = jest.fn();
const mockUpdateMutate = jest.fn();

jest.mock("@/hooks/useWidgets", () => ({
  useWidgets: () => ({
    widgets: [
      { id: "1", text: "first widget" },
      { id: "2", text: "second widget" },
    ],
    isLoading: false,
    addWidget: { mutate: mockAddMutate },
    updateWidget: { mutate: mockUpdateMutate },
  }),
}));

beforeEach(() => {
  mockAddMutate.mockClear();
  mockUpdateMutate.mockClear();
});

test("renders WidgetList and allows adding a widget", () => {
  render(<WidgetList />);

  expect(screen.getByDisplayValue("first widget")).toBeInTheDocument();
  expect(screen.getByDisplayValue("second widget")).toBeInTheDocument();
});

test("calls addWidget.mutate on button click", () => {
  render(<WidgetList />);

  fireEvent.click(screen.getByText("Add Widget"));

  expect(mockAddMutate).toHaveBeenCalled();
});
