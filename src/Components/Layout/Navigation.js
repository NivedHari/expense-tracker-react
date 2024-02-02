import { useDispatch, useSelector } from "react-redux";
import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import { themeActions } from "../store/theme-slice";
import { CiLight } from "react-icons/ci";
import { MdLightMode } from "react-icons/md";
import { logoutUser } from "../store/auth-actions";
import { Fragment } from "react";

const Navigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const isPremium = useSelector(state=> state.ui.isPremium);
  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(logoutUser())
  };
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const toggleThemeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  return (
    <Fragment>
    <header className={classes.header}>
      <Link to="/expenses">
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
        {isPremium && (<button onClick={toggleThemeHandler} className={classes.toggleBtn}>
            {isDarkMode ? <CiLight size="2rem" /> : <MdLightMode size="2rem" />}
          </button>)}
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
    {/* <div className={classes.head}>
      </div> */}
    </Fragment>
  );
};

export default Navigation;
