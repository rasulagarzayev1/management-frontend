import 'react-toastify/dist/ReactToastify.min.css';
import React, { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { updateGoal, createGoal } from '../../utils/apiRequests';
import { isStringValid } from '../../utils/fieldValidator';
import { toast } from 'react-toastify';

const EditCreateModal = ({ modalTitle, goal, onReload, isModalOpen, setIsModalOpen }) => {
	const [goalModel, setGoalModel] = useState(goal);
	const [errorMessage, setErrorMessage] = useState('');
	const onModalCloseClicked = () => {
		setIsModalOpen(false);
		onReload(false);
	};

	const onSubmitBtnClicked = async () => {
		if (!isStringValid(goalModel?.Content)) {
			setErrorMessage('Please fill goal Content');
			return;
		}

		let response;
		if (modalTitle === 'update') {
			response = await updateGoal(goal.Id, goalModel);
		}

		if (modalTitle === 'create') {
			response = await createGoal(goalModel);
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
		}
	};

	const onInputChanged = (data) => {
		setGoalModel({ ...goalModel, ...data });
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
						<h2>Goal {modalTitle} modal</h2>
						<form action="">
							<div>
								<label htmlFor="Content">Content*</label>
								<br />
								<textarea
									type="text"
									name="Content"
									id="Content"
									defaultValue={goal?.Content}
									onChange={(e) => {
										onInputChanged({
											Content: e.target.value,
										});
									}}
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
