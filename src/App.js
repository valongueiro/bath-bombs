import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";

function App() {
  return (
    <div className="App">
      <p>Navigation</p>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:handle">
          <Product />
        </Route>
        <Redirect to="/" />
      </Switch>
      <p>Footer</p>
    </div>
  );
}

export default App;
