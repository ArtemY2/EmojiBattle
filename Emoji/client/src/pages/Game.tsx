import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Timer from '../components/Timer';
import PlayerCard from '../components/PlayerCard';

// Временные данные для тестирования
const dummyPlayers = [
    { id: '1', username: '플레이어1', avatar: '😎', score: 120 },
    { id: '2', username: '플레이어2', avatar: '🦊', score: 90 },
    { id: '3', username: '플레이어3', avatar: '🐼', score: 65 },
];

const Game: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const [currentRound, setCurrentRound] = useState(1);
    const maxRounds = 10;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Верхняя панель */}
                <div className="flex justify-between items-center mb-6">
                    <div className="bg-white rounded-full px-4 py-2 shadow">
                        라운드 {currentRound} / {maxRounds}
                    </div>

                    <Timer duration={20} startTime={Date.now()} />

                    <div className="bg-white rounded-full px-4 py-2 shadow">
                        방: {roomId}
                    </div>
                </div>

                {/* Основная игровая область */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Список игроков */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow p-4">
                            <h2 className="text-xl font-bold mb-4">플레이어</h2>
                            <div className="space-y-3">
                                {dummyPlayers.map(player => (
                                    <PlayerCard key={player.id} player={player} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Центральная часть с эмодзи */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center min-h-[400px]">
                            <div className="text-7xl mb-6">🐍📱🕹️</div>

                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="w-8 h-1 bg-gray-300 rounded-full"
                                    />
                                ))}
                            </div>

                            <div className="w-full mt-4">
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="답변을 입력하세요..."
                                        className="flex-1 px-4 py-3 rounded-l-lg border-2 border-purple-300 focus:outline-none focus:border-purple-500"
                                    />
                                    <button
                                        className="px-6 py-3 rounded-r-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                                    >
                                        제출
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Чат и подсказки */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow p-4 h-full">
                            <h2 className="text-xl font-bold mb-4">채팅</h2>
                            <div className="space-y-2 mb-4 h-80 overflow-y-auto">
                                <div className="p-2 bg-gray-100 rounded">
                                    <span className="font-bold">플레이어1:</span> 뱀?
                                </div>
                                <div className="p-2 bg-gray-100 rounded">
                                    <span className="font-bold">플레이어2:</span> 휴대폰 게임
                                </div>
                                <div className="p-2 bg-purple-100 rounded">
                                    <span className="font-bold text-purple-700">시스템:</span> 힌트: 2010년대의 인기 게임
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;