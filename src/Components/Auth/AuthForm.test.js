import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import AuthForm from "./AuthForm";
import store from "./../store/index";
import '@testing-library/jest-dom';

describe("AuthForm", () => {
  test("renders create new account", () => {
    render(
      <Provider store={store}>
        <Router>
          <AuthForm />
        </Router>
      </Provider>
    );
    const create = screen.getByText("Create new account", { exact: false });
    expect(create).toBeInTheDocument();
  });
  test("renders Forgot password", () => {
    render(
      <Provider store={store}>
        <Router>
          <AuthForm />
        </Router>
      </Provider>
    );
    const forgot = screen.getByText("Forgot Password?", { exact: false });
    expect(forgot).toBeInTheDocument();
  });
});
