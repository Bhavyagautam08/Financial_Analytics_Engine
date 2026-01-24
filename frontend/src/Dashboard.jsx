import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import StatCard from './components/StatCard';
import ExpenseChart from './components/ExpenseChart';
import RecentTransactions from './components/RecentTransactions';
import ExpenseForm from './components/ExpenseForm';
import BudgetForm from './components/BudgetForm';
import { getAvatarDisplay } from './components/AvatarSelector';
import { Wallet, TrendingUp, AlertCircle, Target, RefreshCw } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [analytics, setAnalytics] = useState({ categoryStats: [], monthlyStats: [] });
    const [forecast, setForecast] = useState({ predictedTotal: 0, budgetLimit: 0, status: 'Loading...' });
    const [budget, setBudget] = useState({ totalMonthlyBudget: 0 });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchData = async () => {
        try {
            const [analyticsRes, forecastRes, budgetRes, profileRes] = await Promise.all([
                api.get('/expenses/analytics'),
                api.get('/forecast'),
                api.get('/budgets'),
                api.get('/auth/profile')
            ]);

            setAnalytics(analyticsRes.data);
            setForecast(forecastRes.data);
            setBudget(budgetRes.data);
            setUser(profileRes.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refreshTrigger]);

    const handleExpenseAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const handleBudgetSet = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const calculateTotalSpent = () => {
        return analytics.dailyStats?.reduce((acc, curr) => acc + curr.totalAmount, 0) || 0;
    };

    const calculateRemainingBudget = () => {
        const spent = calculateTotalSpent();
        const limit = budget.totalMonthlyBudget || 0;
        return limit - spent;
    };

    const handleAvatarClick = () => {
        navigate('/profile');
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6 md:p-8 font-sans selection:bg-violet-500/30">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
                        <p className="text-slate-400 mt-1">Welcome back, here's your financial overview.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/recurring')}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition text-sm font-medium"
                        >
                            <RefreshCw size={16} />
                            Recurring
                        </button>
                        <div className="text-right hidden md:block">
                            <p className="text-sm text-slate-400">Remaining Budget</p>
                            <p className={`font-semibold ${calculateRemainingBudget() >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                ₹{calculateRemainingBudget().toLocaleString()}
                            </p>
                        </div>
                        <div
                            onClick={handleAvatarClick}
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${user ? getAvatarDisplay(user.avatar).color : 'from-violet-500 to-fuchsia-500'} border-2 border-slate-900 shadow-lg cursor-pointer hover:opacity-80 hover:scale-105 transition flex items-center justify-center text-lg`}
                            title="Go to Profile"
                        >
                            {user ? getAvatarDisplay(user.avatar).emoji : ''}
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Budget Forecast"
                        value={`₹${(forecast.predictedTotal || 0).toFixed(0)}`}
                        subValue={`Limit: ₹${budget.totalMonthlyBudget || 0}`}
                        status={forecast.status}
                        icon={TrendingUp}
                    />
                    <StatCard
                        title="Total Spent"
                        value={`₹${calculateTotalSpent().toLocaleString()}`}
                        subValue="This year"
                        status={calculateTotalSpent() <= (budget.totalMonthlyBudget || Infinity) ? "On Track" : "Over Budget"}
                        icon={Wallet}
                    />
                    <StatCard
                        title="Monthly Budget"
                        value={`₹${(budget.totalMonthlyBudget || 0).toLocaleString()}`}
                        subValue={budget.totalMonthlyBudget > 0 ? "Set" : "Not set"}
                        icon={Target}
                    />
                    <StatCard
                        title="Categories"
                        value={analytics.categoryStats?.length || 0}
                        subValue="Active categories"
                        icon={AlertCircle}
                    />
                </div>

                {/* Main Content Grid (Bento) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Chart Section - Spans 2 columns */}
                    <div className="lg:col-span-2 space-y-6">
                        <ExpenseChart data={analytics} loading={loading} />

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            <RecentTransactions refreshTrigger={refreshTrigger} />
                        </div>
                    </div>

                    {/* Right Column - Forms */}
                    <div className="col-span-1 space-y-6">
                        <ExpenseForm onExpenseAdded={handleExpenseAdded} />
                        <BudgetForm onBudgetSet={handleBudgetSet} />

                        {/* Categories Summary Mini-List */}
                        <div className="glass-card p-6 rounded-2xl">
                            <h3 className="text-white font-semibold mb-4">Top Categories</h3>
                            <div className="space-y-4">
                                {analytics.categoryStats?.slice(0, 4).map((cat, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <span className="text-slate-400 capitalize">{cat._id}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-violet-500 rounded-full"
                                                    style={{ width: `${Math.min((cat.totalAmount / (budget.totalMonthlyBudget || 5000)) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-slate-200 text-sm font-medium">₹{cat.totalAmount}</span>
                                        </div>
                                    </div>
                                ))}
                                {(!analytics.categoryStats || analytics.categoryStats.length === 0) && (
                                    <p className="text-slate-500 text-sm">No expenses yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
