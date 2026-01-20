import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { LogOut, User } from 'lucide-react';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/profile');
                setUser(res.data);
            } catch (error) {
                console.error("Failed to fetch profile", error);
                // If unauthorized, redirect to login
                navigate('/login');
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    if (!user) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-950 p-6 md:p-8 font-sans">
            <div className="max-w-xl mx-auto space-y-8 mt-10">
                <header className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Your Profile</h1>
                    <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white transition">
                        Back to Dashboard
                    </button>
                </header>

                <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center space-y-6">
                    <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-violet-500/50 flex items-center justify-center text-violet-400 mb-2">
                        <User size={48} />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white">{user.username}</h2>
                        <p className="text-slate-400">{user.email}</p>
                    </div>

                    <div className="w-full pt-6 border-t border-white/5">
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl font-bold 
                                     border border-rose-500/20 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
