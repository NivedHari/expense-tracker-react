import classes from "./Navigation.module.css";
import {Link} from 'react-router-dom';
const Navigation = () => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
    </header>
  );
};

export default Navigation;
