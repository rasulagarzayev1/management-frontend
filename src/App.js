import './assets/style.scss';
import React from 'react';
import Header from './components/Header';
import GoalsPage from './components/goal/GoalsPage';
import UserStoriesPage from './components/user-story/UserStoriesPage';
import ConflictManagement from './components/ConflictManagement';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<Routes>
					<Route exact path="/" element={<GoalsPage />} />
					<Route exact path="/user-stories" element={<UserStoriesPage />} />
					<Route path="/conflict-management" element={<ConflictManagement />} />
				</Routes>
			</Router>
		</div>
	);
}

export default React.memo(App);
