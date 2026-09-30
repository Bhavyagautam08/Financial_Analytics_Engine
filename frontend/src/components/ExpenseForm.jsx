import React, { useState } from 'react';
import api from '../api';
import { Plus } from 'lucide-react';

const ExpenseForm = ({ onExpenseAdded }) => {
    const [newExpense, setNewExpense] = useState({
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/expenses', newExpense);
            // Reset form
            setNewExpense({
                amount: '',
                category: '',
                date: new Date().toISOString().split('T')[0],
                description: '',
            });
            if (onExpenseAdded) onExpenseAdded();
        } catch (error) {
            console.error("Error adding expense:", error);
            alert('Failed to add expense.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6">Add New Transaction</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        required
                        className="input-field"
                        placeholder="Description (e.g. Netflix Subscription)"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="number"
                        required
                        className="input-field"
                        placeholder="Amount"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    />
                    <input
                        type="text"
                        required
                        className="input-field"
                        placeholder="Category"
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    />
                </div>

                <div>
                    <input
                        type="date"
                        required
                        className="input-field [color-scheme:dark]"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold 
                             hover:opacity-90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-violet-500/20
                             disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <Plus size={20} />
                    {loading ? 'Adding...' : 'Add Transaction'}
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
