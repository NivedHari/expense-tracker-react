import classes from "./StartingPage.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const StartingPage = () => {
  return (
    <div className={classes.page}>
      <h1>Welcome To Expense Tracker !!</h1>
      <div className={classes.profile}>
        <h2>Your Profile is Incomplete</h2>
        <Link to="/update-profile"><h3>Complete now</h3></Link>
      </div>
    </div>
  );
};

export default StartingPage;
