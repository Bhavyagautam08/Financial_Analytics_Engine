import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecurringForm from '../components/RecurringForm';
import RecurringList from '../components/RecurringList';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const RecurringPage = () => {
    const navigate = useNavigate();
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleRecurringAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6 md:p-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition text-slate-400 hover:text-white"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                                <RefreshCw className="text-emerald-400" size={28} />
                                Recurring Expenses
                            </h1>
                            <p className="text-slate-400 mt-1">Manage your automated recurring transactions</p>
                        </div>
                    </div>
                </header>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RecurringForm onRecurringAdded={handleRecurringAdded} />
                    <RecurringList refreshTrigger={refreshTrigger} />
                </div>

                {/* Info Card */}
                <div className="glass-card p-6 rounded-2xl border border-emerald-500/20">
                    <h3 className="text-white font-semibold mb-2">How it works</h3>
                    <p className="text-slate-400 text-sm">
                        Recurring transactions are automatically added to your expenses based on the frequency you set.
                        The system processes them daily at midnight. You can toggle them on/off or delete them anytime.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecurringPage;
