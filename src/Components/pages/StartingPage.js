import { useEffect} from "react";
import classes from "./StartingPage.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails } from "../store/auth-actions";

const StartingPage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const profileComplete = useSelector((state) => state.auth.isComplete);
  useEffect(() => {
    dispatch(fetchUserDetails(token));
  }, [token, dispatch]);

  return (
    <div className={classes.outer}>
      <div className={classes.page}>
        <div className={classes.container}>
          <h1>Welcome To Expense Tracker</h1>
        </div>
        <div className={classes.circle}>
          <Link to="/expenses">
            <p className={classes.arrow}>&#8594;</p>
          </Link>
        </div>
        {!profileComplete && (
          <div className={classes.noticeContainer}>
            <div className={classes.notice}>
              <h2>Your Profile is Incomplete !</h2>
              <Link to="/update">
                <div className={classes.linkContainer}>
                  <h3>Complete now&#8594;</h3>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartingPage;
