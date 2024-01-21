import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./Components/pages/AuthPage";
import AuthContext from "./Components/store/auth-context";
import StartingPage from "./Components/pages/startingPage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "./Components/Layout/Layout";
import ForgotPasswordForm from "./Components/Auth/ForgottPassordForm";
import ExpensePage from "./Components/pages/Expenses/ExpensePage";
import UpdateDetails from "./Components/pages/Profile/UpdateDetails";
import Profile from "./Components/pages/Profile/Profile";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <Layout />
      <Switch>
        <Route path="/" exact>
          <StartingPage />
          {!authCtx.isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth" exact>
            <AuthPage />
          </Route>
        )}
        <Route path="/auth/forgot-password">
          <ForgotPasswordForm />
        </Route>
        <Route path='/profile' >
        {authCtx.isLoggedIn && <Profile /> }
        {!authCtx.isLoggedIn && <Redirect to='/auth'></Redirect> }
        </Route>
        <Route path="/update">
          <UpdateDetails />
        </Route>
        {authCtx.isLoggedIn && (<Route path="/expenses">
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
