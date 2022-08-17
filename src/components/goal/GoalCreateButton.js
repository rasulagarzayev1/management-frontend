import React from 'react';

const goalCreateButton = ({ setIsModalOpen }) => {
	return (
		<div className="add-button">
			<button onClick={() => setIsModalOpen(true)}>Add new goal</button>
		</div>
	);
};

export default goalCreateButton;
