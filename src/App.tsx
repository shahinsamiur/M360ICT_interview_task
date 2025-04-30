// App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/productPage';
import ProductDetail from './pages/ProductDetail';
import EditProducts from './pages/editProducts';
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  return (
    <div>


      <Header />

      <Routes>

        <Route path="/" element={<Home />} />   {/* Home page */}
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/:id/edit" element={<EditProducts />} />
      </Routes>


      <Footer />
    </div>
  );
}

export default App;
