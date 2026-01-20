import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Need to verify the exact login endpoint in backend
            // Assuming /auth/login based on plan, but will check routes if fail.
            // Earlier controllers list showed expenseController, let's assume standard auth.
            // If strictly no auth routes exist, I might need to create them or check app.mjs

            // Checking earlier file list... src/routes/expenseRoutes.mjs exists.
            // I should have checked for auth routes.
            // Warning: If no auth backend exists, I might need to mock or implement it. 
            // The prompt implies "make login page", assuming backend supports it or I just make the UI.
            // But usually "make login page" implies functionality.
            // Let's assume standard /users/login or /auth/login.
            // I'll check app.mjs in next step to be sure of the route.

            const res = await api.post('/auth/login', { email, password });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId); // Adjust based on response

            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans">
            <div className="glass-card p-8 rounded-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
                    <p className="text-slate-400 mt-2">Sign in to manage your expenses</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold 
                                 hover:opacity-90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-violet-500/20
                                 disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="text-center mt-4">
                        <a href="/register" className="text-sm text-violet-400 hover:text-violet-300">
                            Don't have an account? Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
