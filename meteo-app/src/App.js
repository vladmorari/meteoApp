import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, Link } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import MeteoPage from "./Pages/MeteoPage";
function App() {
  
  
  return (
    <div>
      <HomePage />
      <MeteoPage />
    </div>
  );
}

export default App;
