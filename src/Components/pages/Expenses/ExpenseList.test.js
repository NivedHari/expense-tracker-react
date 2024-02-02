import { render, screen } from "@testing-library/react";
import ExpenseList from "./ExpenseList";
import { Provider } from "react-redux";
import store from "./../../store/index";
import '@testing-library/jest-dom';

describe("Expense List", () => {
  test("renders no Expenses Added Heading", () => {
    const expenses = [];
    render(
      <Provider store={store}>
        <ExpenseList expenses={expenses} />
      </Provider>
    );

    const total = screen.getByText("No Expenses Added", { exact: false });
    expect(total).toBeInTheDocument();
  });

});
