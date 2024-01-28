import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import UpdateDetails from "./UpdateDetails";
import store from './../../store/index';
import '@testing-library/jest-dom';

describe("AuthForm", () => {
  test("renders Update Button", () => {
    render(
      <Provider store={store}>
        <Router>
          <UpdateDetails/>
        </Router>
      </Provider>
    );
    const update = screen.getByText("Update", { exact: false });
    expect(update).toBeInTheDocument();
  });
  
});
