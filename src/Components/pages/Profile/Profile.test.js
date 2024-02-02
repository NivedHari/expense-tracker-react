import { render, screen, waitFor } from "@testing-library/react";
import Profile from './Profile';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from './../../store/index';
import '@testing-library/jest-dom';

describe("Profile", () => {
  test("renders Update Profile", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Profile/>
        </Router>
      </Provider>
    );

    await waitFor(() => {
      const update = screen.getByTestId("update-profile");
      expect(update).toBeInTheDocument();
    });
  });
});
