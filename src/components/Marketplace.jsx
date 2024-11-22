import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const initialBiofuelProducts = [
  {
    id: 1,
    name: "Sugarcane for Ethanol",
    description: "Used extensively for ethanol production in states like Maharashtra and Uttar Pradesh.",
    priceRange: "₹3,000 - ₹3,500",
    unit: "per metric ton",
    category: "Ethanol Feedstock",
    available: true
  },
  {
    id: 2,
    name: "Corn for Ethanol",
    description: "Growing as a feedstock for ethanol due to high yields and government incentives.",
    priceRange: "₹20 - ₹25",
    unit: "per kg",
    category: "Ethanol Feedstock",
    available: true
  },
  {
    id: 3,
    name: "Rice Husk Pellets",
    description: "Used in industrial boilers and stoves as a clean fuel.",
    priceRange: "₹6,000 - ₹12,000",
    unit: "per metric ton",
    category: "Biomass",
    available: true
  },
  {
    id: 4,
    name: "Biomass Wood Pellets",
    description: "Popular for heating and electricity generation due to low emissions.",
    priceRange: "₹6,000 - ₹12,000",
    unit: "per metric ton",
    category: "Biomass",
    available: true
  },
  {
    id: 5,
    name: "Jatropha Seeds",
    description: "Processed for biodiesel production, especially in arid regions.",
    priceRange: "₹20 - ₹30",
    unit: "per kg",
    category: "Biodiesel",
    available: true
  },
  {
    id: 6,
    name: "Used Cooking Oil (UCO)",
    description: "Repurposed for biodiesel production.",
    priceRange: "₹50 - ₹70",
    unit: "per liter",
    category: "Biodiesel",
    available: true
  }
];

const AddProductForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priceMin: '',
    priceMax: '',
    unit: '',
    category: 'Ethanol Feedstock',
    available: true
  });

  const categories = [
    "Ethanol Feedstock",
    "Biomass",
    "Biodiesel"
  ];

  const units = [
    "per metric ton",
    "per kg",
    "per liter"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      priceRange: `₹${formData.priceMin} - ₹${formData.priceMax}`,
      unit: formData.unit,
      category: formData.category,
      available: formData.available
    };
    onAdd(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Biofuel Material</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Sugarcane for Ethanol"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                required
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Unit</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Price (₹)
              </label>
              <input
                type="number"
                required
                value={formData.priceMin}
                onChange={(e) => setFormData({ ...formData, priceMin: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Minimum price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Price (₹)
              </label>
              <input
                type="number"
                required
                value={formData.priceMax}
                onChange={(e) => setFormData({ ...formData, priceMax: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Maximum price"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows="3"
                placeholder="Describe the material and its uses..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onInquire }) => (
  <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-all duration-200">
    <div className="flex items-center justify-between mb-4">
      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
        {product.category}
      </span>
      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
        {product.available ? 'In Stock' : 'Out of Stock'}
      </span>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
    <div className="border-t pt-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-2xl font-bold text-green-600">{product.priceRange}</span>
          <span className="text-sm text-gray-500 ml-1">{product.unit}</span>
        </div>
      </div>
      <button 
        onClick={() => onInquire(product)}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
      >
        Make Inquiry
      </button>
    </div>
  </div>
);

const InquiryForm = ({ product, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Inquire About {product.name}</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity Required ({product.unit})
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows="3"
            placeholder="Please specify your requirements and questions..."
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Send Inquiry
          </button>
        </div>
      </form>
    </div>
  </div>
);

const Marketplace = () => {
  const [products, setProducts] = useState(initialBiofuelProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ['all', ...new Set(products.map(product => product.category))];

  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const handleInquiry = (product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Biofuel Marketplace</h1>
            <p className="text-gray-600">Find and trade sustainable biofuel materials</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Material
          </button>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-full ${
                  categoryFilter === category
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-green-50'
                } transition-colors`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search biofuel materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onInquire={handleInquiry}
            />
          ))}
        </div>

        {showAddForm && (
          <AddProductForm
            onClose={() => setShowAddForm(false)}
            onAdd={handleAddProduct}
          />
        )}
        {selectedProduct && (
          <InquiryForm
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Marketplace;