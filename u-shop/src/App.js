import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import WomenEthnic from "./components/Womens/WomenEthnic";
import WomenWestern from "./components/Womens/WomenWestern";
import Mens from "./components/Mens/Mens";
import Kids from "./components/Kids/Kids";
import HomeKitchen from "./components/Home&Kitchen/HomeKitchen";
import BeautyHealth from "./components/Beauty&Health/BeautyHealth";
import JewelleryAccessories from "./components/Jewellery&Accessories/JewelleryAccessories";
import BagsFootwear from "./components/Bags&Footwear/BagsFootwear";
import Electronics from "./components/Electronics/Electronics";
import SingleProduct from "./components/Products/SingleProduct";
import AddProduct from "./components/Products/AddProduct";
import EditProduct from "./components/Products/EditProduct";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Cart from "./components/Cart/Cart";
import PaymentSuccess from "./components/PaymentPages/PaymentSuccess";
import PaymentFail from "./components/PaymentPages/PaymentFail";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/women-ethnic" element={<WomenEthnic />} />
        <Route exact path="/women-western" element={<WomenWestern />} />
        <Route exact path="/mens" element={<Mens />} />
        <Route exact path="/kids" element={<Kids />} />
        <Route exact path="/home&kitchen" element={<HomeKitchen />} />
        <Route exact path="/beauty&health" element={<BeautyHealth />} />
        <Route
          exact
          path="/jewellery&accessories"
          element={<JewelleryAccessories />}
        />
        <Route exact path="/bags&footwear" element={<BagsFootwear />} />
        <Route exact path="/electronics" element={<Electronics />} />
        <Route
          exact
          path="/single-product/:singleProdId"
          element={<SingleProduct />}
        />
        <Route exact path="/add-product" element={<AddProduct />} />
        <Route
          exact
          path="/edit-product/:editProdId"
          element={<EditProduct />}
        />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/payment-success" element={<PaymentSuccess />} />
        <Route exact path="/payment-fail" element={<PaymentFail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
