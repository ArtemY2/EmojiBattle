import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { getProfile } from '../graphql/queries';

const client = generateClient();

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthenticator((context) => [context.user]);
    const [profile, setProfile] = useState({
        name: '',
        emoji: '😎',
        level: 1,
        xp: 0
    });
    const [loading, setLoading] = useState(true);

    // Временная функция - потом заменим на сокет
    const handlePlay = () => {
        // Тестовое перенаправление в комнату
        navigate('/game/test-room-123');
    };

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.userId) {
                // Если пользователь не авторизован, показываем гостя
                setProfile({
                    name: '게스트',
                    emoji: '😎',
                    level: 1,
                    xp: 0
                });
                setLoading(false);
                return;
            }

            try {
                const result = await client.graphql({
                    query: getProfile,
                    variables: { id: user.userId },
                    authMode: 'userPool'
                });

                const data = result?.data?.getProfile;
                if (data) {
                    setProfile({
                        name: data.username || user.username || '익명 유저',
                        emoji: data.emoji || '😎',
                        level: 1, // Пока статичные значения
                        xp: 0
                    });
                } else {
                    // Если профиль не найден, показываем данные пользователя
                    setProfile({
                        name: user.username || '익명 유저',
                        emoji: '😎',
                        level: 1,
                        xp: 0
                    });
                }
            } catch (err) {
                console.error('Fetch profile error:', err);
                // В случае ошибки показываем базовые данные
                setProfile({
                    name: user.username || '익명 유저',
                    emoji: '😎',
                    level: 1,
                    xp: 0
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user?.userId, user?.username]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-8">
                Emoji Battle🎮
            </h1>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex items-center">
                <div className="text-4xl mr-4">
                    {loading ? '⏳' : profile.emoji}
                </div>
                <div>
                    <p className="font-bold text-lg">
                        {loading ? '로딩 중...' : profile.name}
                    </p>
                    <p className="text-gray-600">
                        레벨: {profile.level} • XP: {profile.xp}
                    </p>
                </div>
            </div>

            <div className="flex flex-col space-y-4 w-full max-w-md">
                <button
                    onClick={handlePlay}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-full text-xl transition-transform transform hover:scale-105 shadow-lg"
                >
                    플레이 🎮
                </button>

                <button
                    onClick={() => navigate('/ranking')}
                    className="bg-white text-purple-600 font-bold py-4 px-6 rounded-full text-xl border-2 border-purple-500 transition-colors hover:bg-purple-50"
                >
                    랭킹 🏆
                </button>

                <button
                    onClick={() => navigate('/profile')}
                    className="bg-white text-pink-600 font-bold py-4 px-6 rounded-full text-xl border-2 border-pink-500 transition-colors hover:bg-pink-50"
                >
                    프로필 👤
                </button>
            </div>
        </div>
    );
};

export default Home;