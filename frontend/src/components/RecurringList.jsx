import React, { useState, useEffect } from 'react';
import api from '../api';
import { RefreshCw, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const RecurringList = ({ refreshTrigger }) => {
    const [recurrings, setRecurrings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRecurrings = async () => {
        try {
            const res = await api.get('/recurring');
            setRecurrings(res.data.recurrings || []);
        } catch (error) {
            console.error("Error fetching recurring:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecurrings();
    }, [refreshTrigger]);

    const handleToggle = async (id) => {
        try {
            await api.patch(`/recurring/${id}/toggle`);
            fetchRecurrings();
        } catch (error) {
            console.error("Error toggling recurring:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this recurring transaction?')) return;
        try {
            await api.delete(`/recurring/${id}`);
            fetchRecurrings();
        } catch (error) {
            console.error("Error deleting recurring:", error);
        }
    };

    const getFrequencyBadge = (frequency) => {
        const colors = {
            daily: 'bg-rose-500/20 text-rose-400',
            weekly: 'bg-amber-500/20 text-amber-400',
            monthly: 'bg-violet-500/20 text-violet-400',
            yearly: 'bg-emerald-500/20 text-emerald-400'
        };
        return colors[frequency] || 'bg-slate-500/20 text-slate-400';
    };

    if (loading) {
        return (
            <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                    <RefreshCw className="text-emerald-400 animate-spin" size={20} />
                    <h3 className="text-lg font-semibold text-white">Recurring Expenses</h3>
                </div>
                <p className="text-slate-500 text-sm">Loading...</p>
            </div>
        );
    }

    return (
        <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="text-emerald-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Recurring Expenses</h3>
                <span className="ml-auto text-xs text-slate-500">{recurrings.length} active</span>
            </div>

            {recurrings.length === 0 ? (
                <p className="text-slate-500 text-sm">No recurring transactions set up yet.</p>
            ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                    {recurrings.map((item) => (
                        <div
                            key={item._id}
                            className={`flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-white/5 
                                       ${!item.isActive ? 'opacity-50' : ''}`}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="text-white font-medium text-sm">
                                        {item.description || item.category}
                                    </p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${getFrequencyBadge(item.frequency)}`}>
                                        {item.frequency}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-xs capitalize">{item.category}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-violet-400 font-semibold">₹{item.amount}</span>
                                <button
                                    onClick={() => handleToggle(item._id)}
                                    className="text-slate-400 hover:text-emerald-400 transition"
                                    title={item.isActive ? 'Deactivate' : 'Activate'}
                                >
                                    {item.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="text-slate-400 hover:text-rose-400 transition"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecurringList;
