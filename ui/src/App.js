import "./App.css";
import HomePage from "./view/screen/homePage";
import LoginPage from "./view/screen/loginPage";
import { Redirect, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/home" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Redirect from="/" to="/home" />
    </Switch>
  );
}

export default App;
