import React from 'react';
import GoalsList from './GoalsList';
import GoalCreateButton from './GoalCreateButton';
import GoalEditCreateModal from './GoalEditCreateModal';
import Loader from '../Loader';
import { getAllGoals } from '../../utils/apiRequests';
import { ToastContainer } from 'react-toastify';

function GoalsPage() {
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [selectedData, setSelectedData] = React.useState(null);
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	React.useEffect(() => {
		loadGoals();
	}, []);

	const loadGoals = async () => {
		setLoading(true);
		setData([]);
		const response = await getAllGoals();
		setData(response);
		setLoading(false);
	};
	return (
		<div>
			<GoalCreateButton setIsModalOpen={setIsModalOpen} />
			{loading && <Loader />}
			{!loading && data.length > 0 && <GoalsList data={data} onUpdate={(goal) => setSelectedData(goal) + setIsModalOpen(true)} onDelete={loadGoals} />}
			{isModalOpen && (
				<GoalEditCreateModal
					modalTitle={selectedData !== null ? 'update' : 'create'}
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					goal={
						selectedData
							? selectedData
							: {
									Content: '',
							  }
					}
					onReload={(makeRequest) => {
						makeRequest && loadGoals();
						selectedData && setSelectedData(null);
					}}
				/>
			)}
			<ToastContainer />
		</div>
	);
}

export default React.memo(GoalsPage);
