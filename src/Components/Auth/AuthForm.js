import classes from "./AuthForm.module.css";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { loginUser, signUpUser } from "../store/auth-actions";

const AuthForm = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef?.current?.value || '';

    if (!isLogin && enteredPassword !== confirmPassword) {
      alert("Passwords don't match !! ");
      return;
    }

    const user = {
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: confirmPassword,
    };
    console.log(user);

    if (isLogin) {
      dispatch(loginUser(enteredEmail, enteredPassword));
      history.replace("/");
    } else {
      dispatch(signUpUser(enteredEmail, enteredPassword));
    }
  };
  return (
    <div>
      <section className={classes.auth}>
        <form onSubmit={submitHandler}>
          <div>
            <h1 className={classes.h1}>{isLogin ? "Login" : "Sign Up"}</h1>
          </div>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              required
              ref={emailInputRef}
              placeholder="Your Email"
            />
          </div>

          <div className={classes.control}>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
              placeholder="Your Password"
            />
          </div>

          {!isLogin && (
            <div className={classes.control}>
              <input
                type="password"
                id="confirmPassword"
                required
                ref={confirmPasswordInputRef}
                placeholder="Confirm Password"
              />
            </div>
          )}

          <div className={classes.actions}>
            <button>{isLogin ? "Login" : "Create Account"}</button>
          </div>
          {isLogin && <Link to="/auth/forgot-password">Forgot Password?</Link>}
        </form>
      </section>
      <div className={classes.create} onClick={switchAuthModeHandler}>
        {isLogin ? "Create new account" : "Login with existing account"}
      </div>
    </div>
  );
};

export default AuthForm;
