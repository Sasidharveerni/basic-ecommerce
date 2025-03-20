import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [recommend, setRecommend] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchedValue, setSearchedValue] = useState(localStorage.getItem('searchedVal') || '');

    // Fetch products on load
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                //console.log(response.data.products) // Replace with your data source
                setProducts(response.data.products);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchProducts();
    }, []);

    // Fetch recommended if search exists
    useEffect(() => {
        if (searchedValue) {
            fetchRecommended();
        }
    }, [searchedValue]);

    const fetchRecommended = async () => {
        try {
            const response = await axios.get('http://localhost:5000/flask/recommend', {
                params: { q: searchedValue }
            });

            console.log(response.data)
            setRecommend(response.data);
        } catch (error) {
            console.log("Recommendation Error:", error);
        }
    };

    const handleSearch = () => {
        localStorage.setItem('searchedVal', searchInput);
        setSearchedValue(searchInput);
    };

    // Filter products
    const filteredProducts = products.filter(product =>
        (product.title || "").toLowerCase().includes((searchedValue || "").toLowerCase()) ||
        (product.description || "").toLowerCase().includes((searchedValue || "").toLowerCase()) ||
        (product.brand || "").toLowerCase().includes((searchedValue || "").toLowerCase()) ||
        (product.tags || []).some(tag => (tag || "").toLowerCase().includes((searchedValue || "").toLowerCase()))
    );


    // Recommend content-based
    const recommendedProducts = products.filter(product =>
        !filteredProducts.includes(product) &&
        filteredProducts.some(filtered =>
            product.category === filtered.category ||
            product.tags.some(tag => filtered.tags.includes(tag))
        )
    );

   
    

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-purple-600">ShopFast</h1>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border border-gray-300 rounded px-3 py-1"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="ml-2 bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
                    >
                        Search
                    </button>

                    
                </div>
            </header>

            {/* Error */}
            {error && <div className="text-red-500 p-4">{error}</div>}

             {/* Products */}
             <section className="p-4">
                <h2 className="text-xl font-semibold mb-4">ShopFast</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded shadow p-4">
                            <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover mb-2 rounded" />
                            <h3 className="font-bold">{product.title}</h3>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <p className="mt-2 font-semibold text-purple-500">${product.price}</p>
                        </div>
                    ))}
                    {products.length === 0 && <p>No products.</p>}
                </div>
            </section>

            <section className="p-4">
                <h2 className="text-xl font-semibold mb-4">Resume searched products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded shadow p-4">
                            <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover mb-2 rounded" />
                            <h3 className="font-bold">{product.title}</h3>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <p className="mt-2 font-semibold text-purple-500">${product.price}</p>
                        </div>
                    ))}
                    {filteredProducts.length === 0 && <p>No products match your search.</p>}
                </div>
            </section>

           

            {/* Recommended Products */}
            <section className="p-4 bg-purple-50 mt-4">
                <h2 className="text-xl font-semibold mb-4 text-purple-700">Recommended For You</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommend.map(product => (
                        <div key={product.id} className="bg-white rounded shadow p-4">
                            <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover mb-2 rounded" />
                            <h3 className="font-bold">{product.title}</h3>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <p className="mt-2 font-semibold text-purple-500">${product.price}</p>
                        </div>
                    ))}
                    {recommend.length === 0 && <p>No recommendations available.</p>}
                </div>
            </section>
        </div>
    );
}

export default HomePage;
