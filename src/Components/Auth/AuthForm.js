import classes from "./AuthForm.module.css";
import { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../store/auth-context";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();
  const authCtx = useContext(AuthContext);
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
    const confirmPassword = confirmPasswordInputRef.current.value;

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

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEUhj2e9yIbn9BnM3fMuDORzFJrX1w9Fc";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication Failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          const cleanedMail=`${enteredEmail.replace(/\.|@/g, "")}`;
          authCtx.login(data.idToken,cleanedMail);
          console.log(cleanedMail);
          history.replace("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEUhj2e9yIbn9BnM3fMuDORzFJrX1w9Fc";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      });
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

          <div className={classes.control}>
            <input
              type="password"
              id="confirmPassword"
              required
              ref={confirmPasswordInputRef}
              placeholder="Confirm Password"
            />
          </div>

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
