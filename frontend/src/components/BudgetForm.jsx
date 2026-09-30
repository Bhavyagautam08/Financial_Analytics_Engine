import React, { useState, useEffect } from 'react';
import api from '../api';
import { Target } from 'lucide-react';

const BudgetForm = ({ onBudgetSet }) => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentBudget, setCurrentBudget] = useState(0);

    useEffect(() => {
        fetchCurrentBudget();
    }, []);

    const fetchCurrentBudget = async () => {
        try {
            const res = await api.get('/budgets');
            setCurrentBudget(res.data.totalMonthlyBudget || 0);
        } catch (error) {
            console.error("Error fetching budget:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || parseFloat(amount) <= 0) return;

        setLoading(true);
        try {
            await api.post('/budgets', {
                category: 'Total',
                amount: parseFloat(amount),
                period: 'monthly'
            });
            setCurrentBudget(parseFloat(amount));
            setAmount('');
            if (onBudgetSet) onBudgetSet();
        } catch (error) {
            console.error("Error setting budget:", error);
            alert('Failed to set budget.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
                <Target className="text-violet-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Monthly Budget</h3>
            </div>

            {currentBudget > 0 && (
                <p className="text-slate-400 text-sm mb-4">
                    Current limit: <span className="text-violet-400 font-semibold">₹{currentBudget.toLocaleString()}</span>
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="number"
                    className="input-field"
                    placeholder="Set monthly budget (₹)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold 
                             hover:opacity-90 transition-all duration-200 shadow-lg shadow-violet-500/20
                             disabled:opacity-50 text-sm"
                >
                    {loading ? 'Saving...' : 'Set Budget'}
                </button>
            </form>
        </div>
    );
};

export default BudgetForm;
