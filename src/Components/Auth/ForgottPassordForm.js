import { useDispatch } from "react-redux";
import { useRef } from "react";
import { forgotPasswordSender } from "../store/auth-actions";
import classes from "./ForgotPasswordForm.module.css";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();

  const resetHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    dispatch(forgotPasswordSender(enteredEmail));
    emailInputRef.current.value="";
  };

  return (
    <section className={classes.forgot}>
      <form onSubmit={resetHandler}>
        <div>
          <h1 className={classes.h1}>Forgot Your Password?</h1>
        </div>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            placeholder="Enter your Email"
          />
        </div>
        <div className={classes.actions}>
          <button >Reset Password</button>
        </div>
      </form>
    </section>
  );
};

export default ForgotPasswordForm;
