import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import FoodList from './components/Foodlist.jsx'; // Import your FoodList component

function Landing() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
    const [showForm, setShowForm] = useState(''); // State to toggle forms

    const handleAuthSuccess = () => {
        setIsAuthenticated(true); // Mark user as authenticated
        setShowForm(''); // Close the form modal
    };

    return (
        <div
            className="h-screen bg-cover bg-center relative"
            style={{
                backgroundImage: `url('https://img.freepik.com/free-photo/top-view-food-frame-with-copy-space_23-2148723447.jpg?t=st=1733986094~exp=1733989694~hmac=78a8d173aab4b889747c21f92eaea7023446b1d81ca02e7181d086ccdb70e4d9&w=1060')`, // Replace with your image URL
            }}
        >
            {!isAuthenticated ? (
                <>
                    {/* Top-right buttons */}
                    {/* <div className="absolute top-4 right-4 flex space-x-4">
                        <button
                            onClick={() => setShowForm('signup')}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            
                        </button>
                        <button
                            onClick={() => setShowForm('login')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            
                        </button>
                    </div> */}

                    {/* Welcome Message */}
                    <div className="flex items-center justify-center h-full text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold">
                            Welcome to Foodify
                        </h1>
                    </div>

                    {/* Conditionally Render Forms */}
                    {showForm && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white w-full max-w-lg rounded-lg shadow-lg relative">
                                <button
                                    onClick={() => setShowForm('')}
                                    className="absolute top-2 right-2 text-red-500 text-2xl font-bold"
                                >
                                    &times;
                                </button>
                                {showForm === 'signup' && (
                                    <Signup onAuthSuccess={handleAuthSuccess} />
                                )}
                                {showForm === 'login' && (
                                    <Login onAuthSuccess={handleAuthSuccess} />
                                )}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="bg-white min-h-screen">
                    {/* Food List */}
                    <FoodList />
                </div>
            )}
        </div>
    );
}

export default Landing;
