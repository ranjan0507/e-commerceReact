import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter, Search } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setProducts([
      {
        id: 1,
        title: "Modern Laptop",
        price: 99999,
        description: "High-performance laptop with the latest specifications",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: 2,
        title: "Wireless Headphones",
        price: 1999,
        description: "Premium wireless headphones with noise cancellation",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: 3,
        title: "Smart Watch",
        price: 29999,
        description: "Feature-rich smartwatch with health tracking",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: 4,
        title: "Casual T-Shirt",
        price: 2999,
        description: "Comfortable cotton t-shirt for everyday wear",
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: 5,
        title: "Running Shoes",
        price: 8999,
        description: "Lightweight running shoes with superior cushioning",
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: 6,
        title: "Coffee Maker",
        price: 7999,
        description: "Automatic coffee maker for perfect brewing",
        category: "Home",
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: 7,
        title: "Desk Lamp",
        price: 3999,
        description: "Modern LED desk lamp with adjustable brightness",
        category: "Home",
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: 8,
        title: "Novel Collection",
        price: 4999,
        description: "Best-selling novel collection set",
        category: "Books",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400"
      },
      {
        id: 9,
        title: "Cookbook",
        price: 499,
        description: "Comprehensive cookbook with international recipes",
        category: "Books",
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400"
      }
    ]);
    setLoading(false);
  }, []);

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const filteredProducts = products
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Featured Products</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}