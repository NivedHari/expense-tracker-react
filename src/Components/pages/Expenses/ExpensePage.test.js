import { render, screen } from "@testing-library/react";
import ExpensePage from "./ExpensePage";
import { Provider } from "react-redux";
import store from "./../../store/index";
import '@testing-library/jest-dom';

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
  
});
