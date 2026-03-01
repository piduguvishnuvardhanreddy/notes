import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-customBg">
            <div className="bg-customCard p-8 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
                {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customPrimary"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customPrimary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-customPrimary hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-6 text-gray-600">
                    Don't have an account? <Link to="/register" className="text-customPrimary font-semibold hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
