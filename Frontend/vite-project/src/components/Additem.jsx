import React, { useState } from 'react';
import axios from 'axios';

function AddItem() {
    const [formData, setFormData] = useState({ name: '', category: '', price: '', isVeg: true });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddItem = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        const token = localStorage.getItem('token'); // Get the token for authentication

        try {
            const response = await axios.post(
                'http://localhost:3000/food/add',
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage('Food item added successfully!');
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Failed to add item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Add New Food Item</h2>
            <form onSubmit={handleAddItem}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Food Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Vegetarian</label>
                    <input
                        type="checkbox"
                        checked={formData.isVeg}
                        onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition disabled:opacity-50"
                >
                    {loading ? 'Adding item...' : 'Add Item'}
                </button>
            </form>
            {message && <p className="mt-6 text-center text-sm text-red-500">{message}</p>}
        </div>
    );
}

export default AddItem;
