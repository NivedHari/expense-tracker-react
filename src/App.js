import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./Components/pages/AuthPage";
import AuthContext from "./Components/store/auth-context";
import StartingPage from "./Components/pages/startingPage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "./Components/Layout/Layout";
import Profile from "./Components/pages/Profile";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div>
    <Layout/>
      <Switch>
        <Route path="/" exact>
          <StartingPage />
          {!authCtx.isLoggedIn && <Redirect to='/auth'></Redirect> }
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile"><Profile/></Route>
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
