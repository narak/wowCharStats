import axios from 'axios';
import useLocalStorage from './useLocalStorage';

const clientID = '939c7296-5335-40c4-9338-b213bfcadc92';
const clientSecret = '1SyEyndtXPGyQIXWPz4w4dheqOeKSKk22hBCQzUP';
const authBody = new FormData();
authBody.append('grant_type', 'client_credentials');

let _req;
function getToken(cb) {
	if (!_req) {
		_req = axios({
			method: 'post',
			url: 'https://www.warcraftlogs.com/oauth/token',
			data: authBody,
			headers: { 'Content-Type': 'multipart/form-data' },
			auth: {
				username: clientID,
				password: clientSecret,
			},
		});
	}
	_req.then(resp => {
		cb(resp.data.access_token);
	}).catch(e => {
		console.error(e);
		cb(e.response.data);
	});
}

export default function useAuthToken() {
	const [token, setToken] = useLocalStorage('auth_token');

	if (!token) {
		getToken(setToken);
	}
	return token;
}
