import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Profile from './Profile';
import store from './../../store/index';
import '@testing-library/jest-dom';

describe("Profile", () => {
  test("renders Update Profile", () => {
    render(
      <Provider store={store}>
        <Router>
          <Profile/>
        </Router>
      </Provider>
    );
    const update = screen.getByText("Update Profile", { exact: false });
    expect(update).toBeInTheDocument();
  });
  
});
