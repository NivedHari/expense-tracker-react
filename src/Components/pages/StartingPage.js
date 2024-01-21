import { useEffect, useContext,useState } from "react";
import classes from "./StartingPage.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../store/auth-context";

const StartingPage = () => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAEUhj2e9yIbn9BnM3fMuDORzFJrX1w9Fc",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: token,
            }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          let errorMessage = "get Failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }

        const userData = await response.json();
        const isProfileComplete =
          userData.users[0].displayName !== undefined &&
          userData.users[0].photoUrl !== undefined &&
          userData.users[0].emailVerified === true;
        setProfileComplete(isProfileComplete);
        console.log(profileComplete);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
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
              <h2>Your Profile is Incomplete</h2>
              <Link to="/update">
                <h3>Complete now&#8594;</h3>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartingPage;
