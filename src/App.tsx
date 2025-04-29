// App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/productPage';
import ProductDetail from './pages/ProductDetail';
import EditProducts from './pages/editProducts';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />   {/* Home page */}
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/:id/edit" element={<EditProducts />} />


      </Routes>
    </div>
  );
}

export default App;
