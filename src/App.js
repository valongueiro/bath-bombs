import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Cart />
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
