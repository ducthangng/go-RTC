import "./App.css";
import HomePage from "./screen/homePage";
import LoginPage from "./screen/loginPage";
import { Redirect, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/home" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Redirect from="/" to="/login" />
    </Switch>
  );
}

export default App;
