import { useEffect, useState } from 'react';
import axios from 'axios';

import useWCLAuthToken from '../../utils/useWCLAuthToken';

import { Layout } from 'antd';
const { Content } = Layout;

const reportQuery = ({ code }) => `
{
  reportData {
    report(
      code: "${code}"
    ) {
      startTime
      endTime
      table(
        startTime: 2558060
        endTime: 2903493
        fightIDs: [7]
      )
    }
  }
}
`;

export default function Report() {
	const token = useWCLAuthToken();
	const [resp, setResp] = useState();

	useEffect(() => {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		axios
			.post(
				'https://www.warcraftlogs.com/api/v2/client',
				{
					query: reportQuery({
						code: 'dajFHABrZMgwGRyC',
					}),
				},
				config
			)
			.then(resp => {
				setResp(resp?.data);
			})
			.catch(console.error);
	}, [token, setResp]);

	console.log(resp);

	return (
		<>
			<Content style={{ padding: '20px 50px' }}>Hello</Content>
		</>
	);
}
