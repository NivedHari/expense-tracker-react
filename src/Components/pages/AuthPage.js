import AuthForm from "./../Auth/AuthForm";
import classes from './AuthPage.module.css';


const AuthPage = () => {
  return (
    <div className={classes.container}>
        <AuthForm />
    </div>
  );
};

export default AuthPage;
