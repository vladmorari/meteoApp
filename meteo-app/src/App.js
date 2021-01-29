import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MeteoPage from "./Pages/MeteoPage";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <li>
            <Link to="/home">HomePage</Link>
          </li>
          <li>
            <Link to="/meteo">MeteoPage</Link>
          </li>
        </nav>
        <Switch>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/meteo">
            <MeteoPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
