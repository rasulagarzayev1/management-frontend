import React from 'react';
import Table from '../Table';
import { FaTrash, FaPen } from 'react-icons/fa';
import { deleteUserStory } from '../../utils/apiRequests';
import { toast } from 'react-toastify';

const UserStoryList = ({ data, onUpdate, onDelete }) => {
	let columns = [
		{
			name: 'Content',
			key: 'Content',
		},
		{
			name: 'Stakeholder motivation',
			key: 'StakeholderMotivation',
		},
		{
			name: 'Business motivation',
			key: 'BusinessMotivation',
		},
		{
			name: 'Strategic motivation',
			key: 'StrategicMotivation',
		},
		{
			name: 'Goal Id (GId)',
			key: 'GoalId',
		},
		{
			name: 'Controls',
			render: (data) => {
				return (
					<div>
						<button className="edit-item-btn" type="button" onClick={() => onUpdate(data)}>
							<FaPen />
						</button>
						<button
							className="delete-item-btn"
							type="button"
							onClick={async () => {
								let response = await deleteUserStory(data.Id);
								if (response?.status === 200) {
									onDelete();
									toast.success('User story deleted successfully!', {
										position: 'top-right',
										autoClose: 2000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
									});
								}
							}}>
							Delete
							<FaTrash />
						</button>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<div>
				<Table data={data} columns={columns} />
			</div>
		</div>
	);
};

export default UserStoryList;
