import classes from "./ForgotPasswordForm.module.css";
import { useRef } from "react";

const ForgotPasswordForm = () => {
  const emailInputRef = useRef();

  const resetHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    try {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAEUhj2e9yIbn9BnM3fMuDORzFJrX1w9Fc";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          requestType: "PASSWORD_RESET",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Password reset failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      // Password reset successful, you can handle success here
      console.log("Password reset email sent successfully!");
    } catch (error) {
      // Handle errors
      console.error("Password reset error:", error.message);
    }
  };

  return (
    <section className={classes.forgot}>
      <form>
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
          <button onClick={resetHandler}>Reset Password</button>
        </div>
      </form>
    </section>
  );
};

export default ForgotPasswordForm;
