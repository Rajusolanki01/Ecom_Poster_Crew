import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/Product Details/ProductDetails";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import Collection from "./pages/Collection/Collection";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "./redux/Slices/categorySlice";
import Payments from "./components/PaymentStatus/Payments";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId?" element={<Collection />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/payments/:status" element={<Payments />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
