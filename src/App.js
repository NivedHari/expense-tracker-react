import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./Components/pages/AuthPage";
import { authActions } from "./Components/store/auth-slice";
import StartingPage from "./Components/pages/startingPage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "./Components/Layout/Layout";
import ForgotPasswordForm from "./Components/Auth/ForgottPassordForm";
import ExpensePage from "./Components/pages/Expenses/ExpensePage";
import UpdateDetails from "./Components/pages/Profile/UpdateDetails";
import Profile from "./Components/pages/Profile/Profile";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="app">
      <Layout />
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
        {isLoggedIn && <Profile /> }
        {!isLoggedIn && <Redirect to='/auth'></Redirect> }
        </Route>
        <Route path="/update">
          <UpdateDetails />
        </Route>
        {isLoggedIn && (<Route path="/expenses">
          <ExpensePage />
        </Route>)}
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
