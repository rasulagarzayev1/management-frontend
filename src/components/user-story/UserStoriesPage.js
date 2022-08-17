import React from 'react';
import UserStoriesList from './UserStoriesList';
import UserStoryCreateButton from './UserStoryCreateButton';
import UserStoryEditCreateModal from './UserStoryEditCreateModal';
import Loader from '../Loader';
import { getAllUserStories } from '../../utils/apiRequests';
import { ToastContainer } from 'react-toastify';

function UserStoriesPage() {
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [selectedData, setSelectedData] = React.useState(null);
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	React.useEffect(() => {
		loadUserStories();
	}, []);

	const loadUserStories = async () => {
		setLoading(true);
		setData([]);
		const response = await getAllUserStories();
		setData(response);
		setLoading(false);
	};
	return (
		<div>
			<UserStoryCreateButton setIsModalOpen={setIsModalOpen} />
			{loading && <Loader />}
			{!loading && data.length > 0 && <UserStoriesList data={data} onUpdate={(userStory) => setSelectedData(userStory) + setIsModalOpen(true)} onDelete={loadUserStories} />}
			{isModalOpen && (
				<UserStoryEditCreateModal
					modalTitle={selectedData !== null ? 'update' : 'create'}
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					userStory={
						selectedData
							? selectedData
							: {
									Content: '',
							  }
					}
					onReload={(makeRequest) => {
						makeRequest && loadUserStories();
						selectedData && setSelectedData(null);
					}}
				/>
			)}
			<ToastContainer />
		</div>
	);
}

export default React.memo(UserStoriesPage);
