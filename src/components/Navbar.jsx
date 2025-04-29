import { ShoppingCart, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Store className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">DUKAAN</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <Link to="/cart" className="relative text-gray-600 hover:text-gray-900">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}