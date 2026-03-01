import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            await register(username, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Try a different username.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-customBg">
            <div className="bg-customCard p-8 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Account</h2>
                {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customPrimary"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customPrimary"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customPrimary"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-customPrimary hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-2"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center mt-6 text-gray-600">
                    Already have an account? <Link to="/login" className="text-customPrimary font-semibold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
