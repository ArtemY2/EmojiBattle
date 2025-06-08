import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Ranking from './pages/Ranking';
import Game from './pages/Game';
import Results from './pages/Results';

const App: React.FC = () => {
    return (
        <Authenticator>
            {({ signOut, user }) => (
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/ranking" element={<Ranking />} />
                        <Route path="/game/:roomId" element={<Game />} />
                        <Route path="/results/:gameId" element={<Results />} />
                    </Routes>
                </Router>
            )}
        </Authenticator>
    );
};

export default App;
