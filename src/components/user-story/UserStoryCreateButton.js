import React from 'react';

const userStoryCreateButton = ({ setIsModalOpen }) => {
	return (
		<div className="add-button">
			<button onClick={() => setIsModalOpen(true)}>Add new user story</button>
		</div>
	);
};

export default userStoryCreateButton;
