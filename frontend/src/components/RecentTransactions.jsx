import React, { useEffect, useState } from 'react';
import api from '../api';
import { ShoppingBag, Coffee, Car, Home, Activity, DollarSign, RefreshCw } from 'lucide-react';

const CategoryIcon = ({ category }) => {
    const lowerCat = category?.toLowerCase() || '';
    if (lowerCat.includes('food') || lowerCat.includes('drink')) return <Coffee size={20} className="text-orange-400" />;
    if (lowerCat.includes('shop') || lowerCat.includes('cloth')) return <ShoppingBag size={20} className="text-violet-400" />;
    if (lowerCat.includes('transport') || lowerCat.includes('car')) return <Car size={20} className="text-blue-400" />;
    if (lowerCat.includes('home') || lowerCat.includes('rent')) return <Home size={20} className="text-emerald-400" />;
    return <Activity size={20} className="text-slate-400" />;
};

const RecentTransactions = ({ refreshTrigger }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                // Assuming the backend supports page/limit
                const res = await api.get('/expenses', {
                    params: { limit: 5, page: 1 }
                });

                // Adjust based on your actual API response which puts data in 'expenses' key
                setTransactions(res.data.expenses || []);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch recent transactions", err);
                setLoading(false);
            }
        };
        fetchRecent();
    }, [refreshTrigger]);

    if (loading) return <div className="text-slate-500 text-sm">Loading transactions...</div>;

    return (
        <div className="glass-card p-6 rounded-2xl h-full">
            <h3 className="text-lg font-semibold text-white mb-6">Recent Transactions</h3>
            <div className="space-y-4">
                {transactions.length === 0 ? (
                    <p className="text-slate-500 text-center py-4">No recent transactions</p>
                ) : (
                    transactions.map((tx) => (
                        <div key={tx._id} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center">
                                    <CategoryIcon category={tx.category} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                                            {tx.description}
                                        </p>
                                        {tx.isRecurring && (
                                            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                                                <RefreshCw size={10} />
                                                Recurring
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        {new Date(tx.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <span className="font-semibold text-slate-200">
                                -₹{Number(tx.amount).toFixed(2)}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;
