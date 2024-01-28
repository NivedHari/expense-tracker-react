import { render, screen } from "@testing-library/react";
import StartingPage from "./startingPage";
import { Provider } from "react-redux";
import store from "./../store/index";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';

describe("Starting Page", () => {
  test("renders Welcome", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <StartingPage />
        </MemoryRouter>
      </Provider>
    );

    const welcome = screen.getByText("Welcome To Expense Tracker", {
      exact: false,
    });
    expect(welcome).toBeInTheDocument();
  });
  

});
