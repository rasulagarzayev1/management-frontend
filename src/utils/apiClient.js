import axios from 'axios';
import { API_URL } from '../const.js';

export const getAllRequest = async (url) => {
	try {
		const response = await axios({
			method: 'get',
			url: API_URL + url,
		});

		return response.data;
	} catch (err) {
		console.error(err);
	}
};

export const postRequest = async (url, reqBody) => {
	try {
		const response = await axios({
			method: 'post',
			url: API_URL + url,
			data: reqBody,
		});

		return response.data;
	} catch (err) {
		console.error(err);
	}
};

export const putRequest = async (url, reqBody) => {
	try {
		const response = await axios({
			method: 'put',
			url: API_URL + url,
			data: reqBody,
		});

		return response.data;
	} catch (err) {
		console.error(err);
	}
};

export const deleteRequest = async (url) => {
	try {
		const response = await axios({
			method: 'delete',
			url: API_URL + url,
		});

		return response.data;
	} catch (err) {
		console.error(err);
	}
};
