import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthForm from "./AuthForm";
import store from "./../store/index";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

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
  test("renders Login", () => {
    render(
      <Provider store={store}>
        <Router>
          <AuthForm />
        </Router>
      </Provider>
    );
    const loginHeading = screen.getByRole("heading", {
      name: "Login",
      exact: false,
    });
    expect(loginHeading).toBeInTheDocument();
  });
  test("renders Login Button", () => {
    render(
      <Provider store={store}>
        <Router>
          <AuthForm />
        </Router>
      </Provider>
    );
    const loginButton = screen.getByRole("button", {
      name: "Login",
      exact: false,
    });
    expect(loginButton).toBeInTheDocument();
  });
  test("renders Login to existing account button", async () => {
    render(
      <Provider store={store}>
        <Router>
          <AuthForm />
        </Router>
      </Provider>
    );
    const initialText = screen.getByText("Create new account", {
      exact: false,
    });
    expect(initialText).toBeInTheDocument();

    const toggleButton = screen.getByText("Create new account");
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const updatedText = screen.getByText("Login with existing account", {
        exact: false,
      });
      expect(updatedText).toBeInTheDocument();
    });
  });

  test("renders SignUp Heading", async () => {
    render(
      <Provider store={store}>
        <Router>
          <AuthForm />
        </Router>
      </Provider>
    );
    const initialText = screen.getByRole("heading", {
      name: "Login",
      exact: false,
    });
    expect(initialText).toBeInTheDocument();

    const toggleButton = screen.getByText("Create new account");
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const updatedText = screen.getByRole("heading", {
        name: "Sign Up",
        exact: false,
      });
      expect(updatedText).toBeInTheDocument();
    });
  });

  test("renders Login Button", () => {
    render(
      <Provider store={store}>
        <Router>
          <AuthForm />
        </Router>
      </Provider>
    );
    const create = screen.getByRole("button", { name:"Login",exact: false });
    expect(create).toBeInTheDocument();
  });

  test("renders Create New Account button", async () => {
    render(
      <Provider store={store}>
        <Router>
          <AuthForm />
        </Router>
      </Provider>
    );
    const initialText = screen.getByRole("heading", {
      name: "Login",
      exact: false,
    });
    expect(initialText).toBeInTheDocument();

    const toggleButton = screen.getByText("Create new account");
    fireEvent.click(toggleButton);

    await waitFor(() => {
      const updatedText = screen.getByRole("button", {
        name: "Create Account",
        exact: false,
      });
      expect(updatedText).toBeInTheDocument();
    });
  });

});
