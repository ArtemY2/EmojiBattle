import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    // Временная функция - потом заменим на сокет
    const handlePlay = () => {
        // Тестовое перенаправление в комнату
        navigate('/game/test-room-123');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-8">
                Emoji Battle🎮
            </h1>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex items-center">
                <div className="text-4xl mr-4">😎</div>
                <div>
                    <p className="font-bold text-lg">게스트</p>
                    <p className="text-gray-600">레벨: 1 • XP: 0</p>
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