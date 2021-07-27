import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import useWCLAuthToken from '../../helpers/useWCLAuthToken';

// import { Layout } from 'antd';
// const { Content } = Layout;

const fightsQuery = ({ code }) => `
{
  reportData {
    report(
      code: "${code}"
    ) {
      fights(
        killType: Kills
      ) {
        id
        name
        startTime
        endTime
        size
      }
    }
  }
}
`;

const Fight = styled.span`
	margin-right: 1rem;
`;

export default function Fights({ code }) {
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
					query: fightsQuery({
						code,
					}),
				},
				config
			)
			.then(resp => {
				setResp(resp?.data);
			})
			.catch(console.error);
	}, [token, setResp, code]);

	const fights = resp?.data?.reportData?.report?.fights;

	return <div>{fights && fights.map(fight => <Fight key={fight.name}>{fight.name}</Fight>)}</div>;
}
