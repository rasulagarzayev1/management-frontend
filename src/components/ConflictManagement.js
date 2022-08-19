import React, { useState } from 'react';
import Select from 'react-select';
import Table from './Table';
import SelectedUserStory from './SelectedUserStory';
import { getAllGoals, getAllUserStories } from '../utils/apiRequests';

function ConflictManagement() {
	const [goals, setGoals] = useState(null);
	const [userStories, setUserStories] = useState(null);
	const [filteredUserStories, setFilteredUserStories] = useState(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	let columns = [
		{
			name: 'Content',
			key: 'Content',
		},
		{
			name: 'Stakeholder Motivation',
			key: 'StakeholderMotivation',
		},
		{
			name: 'Business Motivation',
			key: 'BusinessMotivation',
		},
		{
			name: 'Strategic Motivation',
			key: 'StrategicMotivation',
		},
	];
	const [selectedStoryContent, setSelectedStoryContent] = useState(null);

	React.useEffect(() => {
		loadGoals();
		loadUserStories();
	}, []);

	const onGoalSelected = (data) => {
		setFilteredUserStories(
			userStories.filter((userStory) => {
				return userStory.GoalId === data;
			}),
		);
	};

	const loadGoals = async () => {
		const res = await getAllGoals();
		const correctedStyle = [];
		res.forEach((element) => {
			correctedStyle.push({
				value: element.Id,
				label: element.Content,
			});
		});
		setGoals(correctedStyle);
	};

	const loadUserStories = async () => {
		const res = await getAllUserStories();
		setUserStories(res);
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		const newFilteredArr = filteredUserStories.map((object) => {
			return {
				...object,
				StakeholderMotivation: object.StakeholderMotivation * e.target.StakeholderMotivation.value,
				BusinessMotivation: object.BusinessMotivation * e.target.BusinessMotivation.value,
				StrategicMotivation: object.StrategicMotivation * e.target.StrategicMotivation.value,
			};
		});

		sortByTwo(newFilteredArr);
		setIsModalOpen(true);
		setSelectedStoryContent(newFilteredArr[newFilteredArr.length - 1].Content);
	};

	const sortByTwo = (arr = []) => {
		arr.sort((a, b) => {
			return (
				a.BusinessMotivation + a.StakeholderMotivation + a.StrategicMotivation - (b.BusinessMotivation + b.StakeholderMotivation + b.StrategicMotivation) ||
				b.BusinessMotivation + b.StakeholderMotivation + b.StrategicMotivation - (a.BusinessMotivation + a.StakeholderMotivation + a.StrategicMotivation)
			);
		});
	};

	return (
		<div className="App">
			<div className="dropdown-wrapper">
				<Select
					className="basic-single"
					classNamePrefix="select"
					isSearchable={Boolean(false)}
					options={goals}
					placeholder="Select goal to identify conflicts"
					onChange={(e) => onGoalSelected(e.value)}
				/>
			</div>
			{filteredUserStories && filteredUserStories.length === 0 && <p className="filtering-info">No user story has been found related that goal</p>}
			{filteredUserStories && filteredUserStories.length > 1 && (
				<div className="filtered-data-table">
					<p className="filtering-info">There is {filteredUserStories.length} conflicting user stories as shown in table</p>
					<button onClick={() => setIsFormOpen(!isFormOpen)}>Enter relative importance score to solve conflicts</button>
					{isFormOpen && (
						<form onSubmit={onFormSubmit} action="">
							<div>
								<input type="number" name="StakeholderMotivation" id="StakeholderMotivation" placeholder="Stakeholder Motivation*" min={0} step=".01" />
							</div>
							<div>
								<input type="number" name="BusinessMotivation" id="BusinessMotivation" placeholder="Business Motivation*" min={0} step=".01" />
							</div>
							<div>
								<input type="number" name="StrategicMotivation" id="StrategicMotivation" placeholder="Strategic Motivation" min={0} step=".01" />
							</div>
							<button>Solve conflicts</button>
						</form>
					)}
					{isModalOpen && <SelectedUserStory content={selectedStoryContent} />}
					<Table data={filteredUserStories} columns={columns} />
				</div>
			)}
			{filteredUserStories && filteredUserStories.length === 1 && (
				<div>
					<Table data={filteredUserStories} columns={columns} />
					<p className="filtering-info">There is no conflict</p>
				</div>
			)}
		</div>
	);
}

export default React.memo(ConflictManagement);
