import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./Components/pages/AuthPage";
import AuthContext from "./Components/store/auth-context";
import StartingPage from "../src/Components/pages/StartingPage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <StartingPage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
