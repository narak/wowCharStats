import axios from 'axios';
import useLocalStorage from './useLocalStorage';

const clientID = '9402436a-a9b0-40aa-a6b4-dad81957f72c';
const clientSecret = 'G2LZW1CyLjLQS8kMZjF4gdKfP3vgRRj18K3b2nfB';
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

export default function useWCLAuthToken() {
	const [token, setToken] = useLocalStorage('wclAuthToken');

	if (!token) {
		getToken(setToken);
	}
	return token;
}
