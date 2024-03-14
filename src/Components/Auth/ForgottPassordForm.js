import { useDispatch } from "react-redux";
import { useRef } from "react";
import { forgotPasswordSender } from "../store/auth-actions";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();

  const resetHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    dispatch(forgotPasswordSender(enteredEmail));
    emailInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col justify-center items-center p-5 mt-20">
      <section className="flex text-center justify-center items-center py-4 w-full max-w-sm">
        <form onSubmit={resetHandler}>
          <div>
            <h1 className="text-center text-3xl m-4">Forgot Your Password?</h1>
          </div>
          <div>
            <input
              type="email"
              id="email"
              required
              ref={emailInputRef}
              placeholder="Enter your Email"
              className="m-4 mb-6 rounded w-96 px-2 py-1 bg-slate-200 outline-none"
            />
          </div>
          <div>
            <button className="bg-blue-800 text-white hover:bg-blue-900 py-1 px-6 rounded-lg dark:bg-blue-900 dark:hover:bg-blue-950">Reset Password</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ForgotPasswordForm;
