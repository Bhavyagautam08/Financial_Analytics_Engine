import React, { useState } from 'react';
import api from '../api';
import { RefreshCw } from 'lucide-react';

const RecurringForm = ({ onRecurringAdded }) => {
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        frequency: 'monthly',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.amount || !formData.category) return;

        setLoading(true);
        try {
            await api.post('/recurring', {
                ...formData,
                amount: parseFloat(formData.amount)
            });
            setFormData({
                amount: '',
                category: '',
                frequency: 'monthly',
                description: ''
            });
            if (onRecurringAdded) onRecurringAdded();
        } catch (error) {
            console.error("Error creating recurring:", error);
            alert('Failed to create recurring transaction.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="text-emerald-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Add Recurring Expense</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Description (e.g. Netflix)"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="number"
                        required
                        className="input-field"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                    <input
                        type="text"
                        required
                        className="input-field"
                        placeholder="Category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                </div>

                <select
                    className="input-field"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold 
                             hover:opacity-90 transition-all duration-200 shadow-lg shadow-emerald-500/20
                             disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                >
                    <RefreshCw size={16} />
                    {loading ? 'Creating...' : 'Add Recurring'}
                </button>
            </form>
        </div>
    );
};

export default RecurringForm;
