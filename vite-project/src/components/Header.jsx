import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ cart, removeFromCart, isAuthenticated, onLogout }) {
    const [showCart, setShowCart] = useState(false);
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <header className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl">🍽️</span>
                        <span className="text-white font-bold text-xl">Foodify</span>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-white hover:text-pink-200 transition">
                            Home
                        </Link>
                        <Link to="/menu" className="text-white hover:text-pink-200 transition">
                            
                        </Link>
                    </nav>

                    {/* Auth and Cart Section */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                {/* User Profile */}
                                <div className="text-white">
                                    <span className="mr-4">Hi, {userData.username || 'User'}</span>
                                </div>

                                {/* Cart Button */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowCart(!showCart)}
                                        className="flex items-center space-x-1 text-white hover:text-pink-200 transition"
                                    >
                                        <span className="text-2xl">🛒</span>
                                        {cart.length > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {cart.reduce((total, item) => total + item.quantity, 0)}
                                            </span>
                                        )}
                                    </button>

                                    {/* Cart Dropdown */}
                                    {showCart && (
                                        <div className="absolute right-0 mt-4 w-80 bg-white rounded-lg shadow-xl p-4 z-50">
                                            <h3 className="text-lg font-semibold mb-3 text-gray-800">Your Cart</h3>
                                            {cart.length === 0 ? (
                                                <p className="text-gray-500">Your cart is empty</p>
                                            ) : (
                                                <>
                                                    <div className="max-h-64 overflow-auto">
                                                        {cart.map((item) => (
                                                            <div key={item.id} className="flex items-center justify-between py-2 border-b">
                                                                <div className="flex items-center space-x-3">
                                                                    <img 
                                                                        src={item.image} 
                                                                        alt={item.name} 
                                                                        className="w-12 h-12 rounded-full object-cover"
                                                                    />
                                                                    <div>
                                                                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                                                                        <p className="text-sm text-gray-600">
                                                                            ₹{item.price} x {item.quantity}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => removeFromCart(item.id)}
                                                                    className="text-red-500 hover:text-red-700"
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-4 pt-4 border-t">
                                                        <div className="flex justify-between mb-4">
                                                            <span className="font-semibold text-gray-800">Total:</span>
                                                            <span className="font-semibold text-gray-800">₹{calculateTotal()}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => alert('Proceeding to checkout!')}
                                                            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-md hover:opacity-90 transition"
                                                        >
                                                            Checkout
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link 
                                    to="/login"
                                    className="text-white hover:text-pink-200 transition"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/signup"
                                    className="px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-pink-100 transition"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;