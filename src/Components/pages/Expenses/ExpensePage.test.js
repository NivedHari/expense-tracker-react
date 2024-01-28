import { render, screen } from "@testing-library/react";
import ExpensePage from "./ExpensePage";
import { Provider } from "react-redux";
import store from "./../../store/index";
import "@testing-library/jest-dom";

describe("Expense Page", () => {
  test("renders Total Expense", () => {
    render(
      <Provider store={store}>
        <ExpensePage />
      </Provider>
    );

    const total = screen.getByText("Total Expense", { exact: false });
    expect(total).toBeInTheDocument();
  });
  test("Add New Expense Button", () => {
    render(
      <Provider store={store}>
        <ExpensePage />
      </Provider>
    );

    const button = screen.getByText("Add New Expense", { exact: false });
    expect(button).toBeInTheDocument();
  });

  test("Renders Fetching the data", async () => {
    render(
      <Provider store={store}>
        <ExpensePage />
      </Provider>
    );

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: "-Np64k3pnlDQPQfQY8Wp",
          amount: "10000",
          category: "Food",
          description: "Good",
        },
      ],
    });

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });

  
});
