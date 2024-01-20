import classes from "./AuthForm.module.css";
import { useRef, useState } from "react";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

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

    if (enteredPassword !== confirmPassword) {
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
        //n
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGsfKHWAjmDu8yEHWUSWa8NmvoH1Vnv0s";
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
            console.log("Signup success!")
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
            {/* <label htmlFor="email">Your Email</label> */}
            <input type="email" id="email" required ref={emailInputRef} placeholder="Your Email"/>
          </div>
          <div className={classes.control}>
            {/* <label htmlFor="password">Your Password</label> */}
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
              placeholder="Your Password"
            />
          </div>
          <div className={classes.control}>
            {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
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
        </form>
      </section>
      <div className={classes.create} onClick={switchAuthModeHandler}>
        {isLogin ? "Create new account" : "Login with existing account"}
      </div>
    </div>
  );
};

export default AuthForm;
