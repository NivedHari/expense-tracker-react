import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import store from "./../store/index";
import '@testing-library/jest-dom';

describe("Navigation", () => {
  test("renders logo", () => {
    render(
      <Provider store={store}>
        <Router>
          <Navigation />
        </Router>
      </Provider>
    );
    const logo = screen.getByText("Expense Tracker", { exact: false });
    expect(logo).toBeInTheDocument();
  });
  test("renders profile", () => {
    render(
      <Provider store={store}>
        <Router>
          <Navigation />
        </Router>
      </Provider>
    );
    const profile = screen.getByText("Dark", { exact: false });
    expect(profile).toBeInTheDocument();
  });
});
