import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { LogOut, ArrowLeft } from 'lucide-react';
import AvatarSelector, { getAvatarDisplay } from '../components/AvatarSelector';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/profile');
                setUser(res.data);
            } catch (error) {
                console.error("Failed to fetch profile", error);
                navigate('/login');
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleAvatarSelect = async (avatarId) => {
        setLoading(true);
        try {
            const res = await api.patch('/auth/avatar', { avatar: avatarId });
            setUser(res.data.user);
        } catch (error) {
            console.error("Failed to update avatar", error);
            alert("Failed to update avatar");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    if (!user) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">Loading...</div>;

    const avatarDisplay = getAvatarDisplay(user.avatar);

    return (
        <div className="min-h-screen bg-slate-950 p-6 md:p-8 font-sans">
            <div className="max-w-xl mx-auto space-y-8 mt-10">
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition text-slate-400 hover:text-white"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Your Profile</h1>
                    </div>
                </header>

                <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center space-y-6">
                    {/* Current Avatar Display */}
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${avatarDisplay.color} flex items-center justify-center text-5xl shadow-lg`}>
                        {avatarDisplay.emoji}
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white">{user.username}</h2>
                        <p className="text-slate-400">{user.email}</p>
                        <p className="text-xs text-slate-500 mt-1">Currency: {user.currency}</p>
                    </div>
                </div>

                {/* Avatar Selector */}
                <AvatarSelector
                    currentAvatar={user.avatar}
                    onSelect={handleAvatarSelect}
                    loading={loading}
                />

                {/* Logout */}
                <div className="glass-card p-6 rounded-2xl">
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
    );
};

export default ProfilePage;
