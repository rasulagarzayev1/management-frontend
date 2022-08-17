import { getAllRequest, postRequest, putRequest, deleteRequest } from './apiClient';

export const getAllUserStories = async () => {
	let response;
	try {
		response = await getAllRequest('/userStories/getUserStories');
	} catch (error) {
		console.error(error);
	}
	return response;
};

export const updateUserStory = async (id, reqBody) => {
	let response;
	try {
		response = await putRequest(`/userStory/editUserStory/${id}`, reqBody);
	} catch (error) {
		console.error(error);
	}
	return response;
};

export const deleteUserStory = async (id) => {
	let response;
	try {
		response = await deleteRequest(`/userStory/deleteUserStory/${id}`);
	} catch (error) {
		console.error(error);
	}
	return response;
};

export const createUserStory = async (reqBody) => {
	let response;
	try {
		response = await postRequest('/userStory/createUserStory', reqBody);
	} catch (error) {
		console.error(error);
	}
	return response;
};

export const getAllGoals = async () => {
	let response;
	try {
		response = await getAllRequest('/goals/getGoals');
	} catch (error) {
		console.error(error);
	}
	return response;
};

export const updateGoal = async (id, reqBody) => {
	let response;
	try {
		response = await putRequest(`/goal/editGoal/${id}`, reqBody);
	} catch (error) {
		console.error(error);
	}
	return response;
};

export const deleteGoal = async (id) => {
	let response;
	try {
		response = await deleteRequest(`/goal/deleteGoal/${id}`);
	} catch (error) {
		console.error(error);
	}
	return response;
};

export const createGoal = async (reqBody) => {
	let response;
	try {
		response = await postRequest('/goal/createGoal', reqBody);
	} catch (error) {
		console.error(error);
	}
	return response;
};
