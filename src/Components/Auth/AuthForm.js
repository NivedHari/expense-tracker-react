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
    <div className="flex flex-col justify-center items-center p-5 mt-20 dark:text-white">
      <section className="flex text-center justify-center items-center py-4 w-full max-w-sm" >
        <form onSubmit={submitHandler}>
          <div>
            <h1 className="text-center text-3xl m-4">{isLogin ? "Login" : "Sign Up"}</h1>
          </div>
          <div className="mb-2">
            <input
              type="email"
              id="email"
              required
              ref={emailInputRef}
              placeholder="Your Email"
              className="mb-4 rounded w-96 px-2 py-1 bg-slate-200 outline-none"

            />
          </div>

          <div className="mb-2">
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
              placeholder="Your Password"
              className="mb-4 rounded w-96 px-2 py-1 bg-slate-200 outline-none"
            />
          </div>
          {!isLogin && (
            <div >
              <input
                type="password"
                id="confirmPassword"
                required
                ref={confirmPasswordInputRef}
                placeholder="Confirm Password"
                className="mb-4 rounded w-96 px-2 py-1 bg-slate-200 outline-none"
              />
            </div>
          )}

          {isLogin && <Link className='hover:text-slate-600 dark:hover:text-slate-200' to="/auth/forgot-password">Forgot Password?</Link>}

          <div className="mt-4" >
            <button className="bg-blue-800 text-white hover:bg-blue-900 py-1 px-6 rounded-lg dark:bg-blue-900 dark:hover:bg-blue-950">{isLogin ? "Login" : "Create Account"}</button>
          </div>
        </form>
      </section>
      <div className="hover:cursor-pointer underline hover:text-slate-700 dark:hover:text-slate-200"  onClick={switchAuthModeHandler}>
        {isLogin ? "Dont' have an account? Sign up" : "Already have an account? Login"}
      </div>
    </div>
  );
};

export default AuthForm;
