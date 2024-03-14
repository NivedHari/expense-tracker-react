import { useDispatch, useSelector } from "react-redux";
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
    <header className="top-0 left-0 w-full flex justify-between items-center px-4 py-4 h-15 absolute dark:text-white " >
      <Link to="/expenses">
        <div className="text-3xl hover:text-slate-700 dark:hover:text-slate-300">Expense Tracker</div>
      </Link>
      <nav>
        <ul className="flex items-center ">
        {isPremium && (<button className="dark:hover:text-slate-300" onClick={toggleThemeHandler} >
            {isDarkMode ? <CiLight size="2rem" /> : <MdLightMode size="2rem" />}
          </button>)}
          {isLoggedIn && (
            <li>
              <Link className="mx-4 hover:text-slate-700 dark:hover:text-slate-300" to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button className="mx-4 hover:text-slate-700 dark:hover:text-slate-300"  onClick={logoutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
    </Fragment>
  );
};

export default Navigation;
