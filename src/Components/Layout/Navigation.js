import { useDispatch, useSelector } from "react-redux";
import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { authActions } from "../store/auth-slice";

const Navigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <Link to="/expenses">
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button className={classes.logoutBtn} onClick={logoutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
