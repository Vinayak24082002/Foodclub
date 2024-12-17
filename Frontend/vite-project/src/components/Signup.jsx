import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup({ onAuthSuccess }) {
    const navigate = useNavigate(); // For navigation between routes
    const [formData, setFormData] = useState({ fullname: '', email: '', password: '', username: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await axios.post('https://foodclub-backend.vercel.app/user/signup', formData);
            setMessage(response.data.message);

            if (response.status === 201) {
                onAuthSuccess(); // Notify parent about successful signup
            }
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center rounded-3xl bg-gray-100 min-h-[600px]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Create Account</h2>
                <p className="text-center text-gray-600 mb-6">Join our community today</p>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.fullname}
                            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            placeholder="Choose a username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition disabled:opacity-50 font-semibold"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')} // Navigate to login page
                        className="text-red-500 hover:text-red-600 font-semibold"
                    >
                        Sign in
                    </button>
                </p>
                {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
            </div>
        </div>
    );
}

export default Signup;
