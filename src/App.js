import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "./Components/Layout/Layout";
import ReactLoading from "react-loading";


const StartingPage = lazy(() => import("./Components/pages/startingPage"));
const AuthPage = lazy(() => import("./Components/pages/AuthPage"));
const ForgotPasswordForm = lazy(() => import("./Components/Auth/ForgottPassordForm"));
const UpdateDetails = lazy(() => import("./Components/pages/Profile/UpdateDetails"));
const Profile = lazy(() => import("./Components/pages/Profile/Profile"));
const ExpensePage = lazy(() => import("./Components/pages/Expenses/ExpensePage"));


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="app">
      <Layout />
      <Suspense fallback={<ReactLoading className="loading"  type={"spin"} color={"#91abee"} height={50} width={50} />}>
        <Switch>
          <Route path="/" exact>
            <StartingPage />
            {!isLoggedIn && <Redirect to="/auth"></Redirect>}
          </Route>
          {!isLoggedIn && (
            <Route path="/auth" exact>
              <AuthPage />
            </Route>
          )}
          <Route path="/auth/forgot-password">
            <ForgotPasswordForm />
          </Route>
          <Route path='/profile' >
            {isLoggedIn && <Profile />}
            {!isLoggedIn && <Redirect to='/auth'></Redirect>}
          </Route>
          <Route path="/update">
            <UpdateDetails />
          </Route>
          {isLoggedIn && (
            <Route path="/expenses">
              <ExpensePage />
            </Route>
          )}
          <Route path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
