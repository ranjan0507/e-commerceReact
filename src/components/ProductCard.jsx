import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../store/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative w-full h-48 group">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img 
          src={product.image} 
          alt={product.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-48 object-cover transition-all duration-300 ${imageLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'}`}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
        <p className="text-gray-600 text-sm mt-1 h-12 overflow-hidden">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">{formatPrice(product.price)}</span>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transform transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}