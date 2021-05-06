import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { ProvideAuth } from "../auth";
import Cart from "./Cart";
import Checkout from "./Checkout";
import DropOff from "./DropOff";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import ProductDetail from "./ProductDetail";
import Products from "./Products";

function CovidResponseSection() {
  const location = useLocation();

  if (location.pathname === "/dropoff") return null;

  return (
    <div className="flex bg-red-600 text-white justify-between px-2 py-0.5 font-semibold text-sm">
      <div>JU</div>
      <div>
        {/* <Link to="/dropoff" className="hover:border-b hover:border-white">
          Find a drop-off station near me
        </Link> */}
        Take care and stay safe.
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <ProvideAuth>
        <Router>
          <Navbar />
          <div style={{ minWidth: "800px" }}>
            <CovidResponseSection />
            <Switch>
              <Route path="/products/:id">
                <ProductDetail />
              </Route>
              <Route path="/products">
                <Products />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/dropoff">
                <DropOff />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
