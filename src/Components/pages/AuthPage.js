import { Fragment } from "react";
import AuthForm from "./../Auth/AuthForm";
import classes from './AuthPage.module.css';


const AuthPage = () => {
  return (
    <Fragment>
    <div className={classes.container}>
        <AuthForm />
    </div>
    </Fragment>
  );
};

export default AuthPage;
