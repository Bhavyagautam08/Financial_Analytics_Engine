import React from 'react';

const avatars = [
    { id: 'avatar1', emoji: '👨‍💼', color: 'from-violet-500 to-purple-600' },
    { id: 'avatar2', emoji: '👩‍💻', color: 'from-pink-500 to-rose-600' },
    { id: 'avatar3', emoji: '🧑‍🎨', color: 'from-emerald-500 to-teal-600' },
    { id: 'avatar4', emoji: '👨‍🚀', color: 'from-blue-500 to-cyan-600' },
    { id: 'avatar5', emoji: '👩‍🔬', color: 'from-amber-500 to-orange-600' },
    { id: 'avatar6', emoji: '🧑‍🎤', color: 'from-red-500 to-rose-600' },
    { id: 'avatar7', emoji: '👨‍🍳', color: 'from-lime-500 to-green-600' },
    { id: 'avatar8', emoji: '👩‍🎓', color: 'from-indigo-500 to-violet-600' },
];

const AvatarSelector = ({ currentAvatar, onSelect, loading }) => {
    return (
        <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">Choose Avatar</h3>
            <div className="grid grid-cols-4 gap-4">
                {avatars.map((avatar) => (
                    <button
                        key={avatar.id}
                        onClick={() => onSelect(avatar.id)}
                        disabled={loading}
                        className={`
                            w-14 h-14 rounded-full bg-gradient-to-br ${avatar.color}
                            flex items-center justify-center text-2xl
                            transition-all duration-200 hover:scale-110
                            ${currentAvatar === avatar.id
                                ? 'ring-4 ring-white ring-offset-2 ring-offset-slate-900 scale-110'
                                : 'opacity-70 hover:opacity-100'}
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                    >
                        {avatar.emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Helper function to get avatar display
export const getAvatarDisplay = (avatarId) => {
    const avatar = avatars.find(a => a.id === avatarId) || avatars[0];
    return avatar;
};

export default AvatarSelector;
