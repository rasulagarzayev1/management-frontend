import React from 'react';
import { NavLink } from 'react-router-dom';

const SelectedUserStory = ({ content }) => {
	return (
		<div className="selected-user-story">
			<form>
				<h2>The following user story has been selected:</h2>
				<p>{content}</p>
				<NavLink to="/" activeclassname="is-active">
					End process
				</NavLink>
			</form>
		</div>
	);
};

export default SelectedUserStory;
