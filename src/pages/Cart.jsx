import { useSelector, useDispatch } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { useState } from 'react';
import CheckoutForm from '../components/CheckoutForm';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showCheckout, setShowCheckout] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% tax
  const total = subtotal + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center py-4 border-b">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.price}</p>
              </div>
              <div className="flex items-center">
                <select
                  value={item.quantity}
                  onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))}
                  className="mx-2 border rounded-md p-1"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-700 ml-10 cursor-pointer"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span>Tax (18%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold pt-4 border-t">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowCheckout(true)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
          {showCheckout && (
            <CheckoutForm
              total={total}
              onClose={() => setShowCheckout(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}