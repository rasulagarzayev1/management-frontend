import 'react-toastify/dist/ReactToastify.min.css';
import React, { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { updateUserStory, createUserStory } from '../../utils/apiRequests';
import { isStringValid } from '../../utils/fieldValidator';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { getAllGoals } from '../../utils/apiRequests';

const motivations = [
	{ value: '5', label: 'Very High' },
	{ value: '4', label: 'High' },
	{ value: '3', label: 'Medium' },
	{ value: '2', label: 'Low' },
	{ value: '1', label: 'Very Low' },
];

const EditCreateModal = ({ modalTitle, userStory, onReload, isModalOpen, setIsModalOpen }) => {
	const [userStoryModel, setUserStoryModel] = useState(userStory);
	const [errorMessage, setErrorMessage] = useState('');
	const [goals, setGoals] = useState(null);

	React.useEffect(() => {
		loadGoals();
	}, []);

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

	const findSelectedGoal = () => {
		if (!isModalOpen) {
			return;
		}
		return goals?.find((goal) => goal.Id === userStory.GoalId);
	};

	const onModalCloseClicked = () => {
		setIsModalOpen(false);
		onReload(false);
	};

	const onSubmitBtnClicked = async () => {
		if (!isStringValid(userStoryModel?.Content)) {
			setErrorMessage('Please fill all fields');
			return;
		}

		let response;
		if (modalTitle === 'update') {
			response = await updateUserStory(userStory.Id, userStoryModel);
		}

		if (modalTitle === 'create') {
			response = await createUserStory(userStoryModel);
		}

		if (response && response.status === 200) {
			onReload(true);
			setIsModalOpen(false);
			toast.success('Completed successfully!', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error('Please fill all fields and try again!', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const onInputChanged = (data) => {
		setUserStoryModel({ ...userStoryModel, ...data });
	};

	return (
		<React.Fragment>
			{isModalOpen && (
				<div className="edit-create-modal">
					<div className="edit-create-modal__container">
						{errorMessage && <h3>{errorMessage}</h3>}
						<div className="modal-control">
							<p>
								<GrClose onClick={onModalCloseClicked} />
							</p>
						</div>
						<h2>User story {modalTitle} modal</h2>
						<form action="">
							<div>
								<label htmlFor="Content">Content*</label>
								<br />
								<textarea
									type="text"
									name="Content"
									id="Content"
									defaultValue={userStory?.Content}
									onChange={(e) =>
										onInputChanged({
											Content: e.target.value,
										})
									}
								/>
							</div>
							<div>
								<label htmlFor="functionalGoalId">Related functional goal*</label>
								<br />
								<Select
									className="basic-single"
									classNamePrefix="select"
									isSearchable={Boolean(false)}
									options={goals}
									defaultValue={findSelectedGoal}
									onChange={(e) =>
										onInputChanged({
											GoalId: e.value,
										})
									}
								/>
							</div>
							<div>
								<label>Stakeholder motivation level*</label>
								<br />
								<Select
									className="basic-single"
									classNamePrefix="select"
									isSearchable={Boolean(false)}
									options={motivations}
									defaultValue={motivations[0]}
									onChange={(e) =>
										onInputChanged({
											StakeholderMotivation: e.value,
										})
									}
								/>
							</div>
							<div>
								<label>Business motivation level*</label>
								<br />
								<Select
									className="basic-single"
									classNamePrefix="select"
									isSearchable={Boolean(false)}
									options={motivations}
									defaultValue={motivations[0]}
									onChange={(e) =>
										onInputChanged({
											BusinessMotivation: e.value,
										})
									}
								/>
							</div>
							<div>
								<label>Strategic motivation level*</label>
								<br />
								<Select
									className="basic-single"
									classNamePrefix="select"
									isSearchable={Boolean(false)}
									options={motivations}
									defaultValue={motivations[0]}
									onChange={(e) =>
										onInputChanged({
											StrategicMotivation: e.value,
										})
									}
								/>
							</div>
							<button type="button" onClick={onSubmitBtnClicked}>
								{modalTitle.toUpperCase()}
							</button>
						</form>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

export default EditCreateModal;
