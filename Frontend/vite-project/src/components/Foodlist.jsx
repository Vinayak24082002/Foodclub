// src/components/Foodlist.jsx
import React, { useState, useEffect } from 'react';
import sampleFoodData from '../samplefood';

function FoodList({ addToCart }) {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            setTimeout(() => {
                setFoods(sampleFoodData);
                setLoading(false);
            }, 500);
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Food Menu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.map((food) => (
                    <div key={food.id} className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
                        <img
                            src={food.image || 'https://via.placeholder.com/150'}
                            alt={food.name}
                            className="w-32 h-32 object-cover rounded-full mb-4"
                        />
                        <h2 className="text-xl font-semibold">{food.name}</h2>
                        <p className="text-gray-500 text-sm">{food.description}</p>
                        <p className="text-green-600 font-bold mt-2">₹{food.price}</p>
                        <button
                            onClick={() => addToCart(food)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FoodList;