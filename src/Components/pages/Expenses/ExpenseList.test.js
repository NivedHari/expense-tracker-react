import { render, screen } from "@testing-library/react";
import ExpenseList from "./ExpenseList";
import { Provider } from "react-redux";
import store from "./../../store/index";
import '@testing-library/jest-dom';

describe("Expense Page", () => {
  test("renders Expenses List Heading", () => {
    const expenses = [];
    render(
      <Provider store={store}>
        <ExpenseList expenses={expenses} />
      </Provider>
    );

    const total = screen.getByText("Expenses List", { exact: false });
    expect(total).toBeInTheDocument();
  });
});
