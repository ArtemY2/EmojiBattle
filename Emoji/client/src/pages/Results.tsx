import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Временные данные для примера
const dummyResults = [
    { id: '1', username: '이미지마스터', avatar: '🦊', score: 125, position: 1, correctAnswers: 8 },
    { id: '2', username: '퍼즐솔버', avatar: '🐼', score: 95, position: 2, correctAnswers: 6 },
    { id: '3', username: '플레이어3', avatar: '🦄', score: 70, position: 3, correctAnswers: 5 },
    { id: '4', username: '플레이어4', avatar: '🦁', score: 60, position: 4, correctAnswers: 4 },
    { id: '5', username: '플레이어5', avatar: '🐯', score: 45, position: 5, correctAnswers: 3 },
];

const Results: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const navigate = useNavigate();

    // Определяем MVP (Most Valuable Player)
    const mvp = dummyResults[0];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h1 className="text-3xl font-bold mb-2 text-center">게임 결과</h1>
                    <p className="text-center text-gray-600 mb-8">게임 #{gameId}</p>

                    {/* MVP секция */}
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-8 shadow-inner">
                        <div className="text-center mb-2">🏆 MVP 🏆</div>
                        <div className="flex items-center justify-center mb-3">
                            <div className="text-6xl mr-4">{mvp.avatar}</div>
                            <div>
                                <h2 className="text-2xl font-bold">{mvp.username}</h2>
                                <p className="text-gray-700">정답 수: {mvp.correctAnswers}</p>
                            </div>
                        </div>
                    </div>

                    {/* Таблица результатов */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">결과 테이블</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left">순위</th>
                                    <th className="px-4 py-2 text-left">플레이어</th>
                                    <th className="px-4 py-2 text-right">점수</th>
                                    <th className="px-4 py-2 text-right">정답 수</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dummyResults.map(player => (
                                    <tr key={player.id} className={`border-b hover:bg-gray-50 ${player.position === 1 ? 'bg-yellow-50' : ''}`}>
                                        <td className="px-4 py-3">
                                            {player.position === 1 ? '🥇' : player.position === 2 ? '🥈' : player.position === 3 ? '🥉' : player.position}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center">
                                                <span className="text-2xl mr-2">{player.avatar}</span>
                                                <span>{player.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right font-semibold">{player.score}</td>
                                        <td className="px-4 py-3 text-right">{player.correctAnswers}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={() => navigate('/game/new-game')}
                            className="emoji-button flex-1"
                        >
                            다시 플레이 🎮
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="secondary-button flex-1"
                        >
                            로비로 돌아가기 🏠
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;