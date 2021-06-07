import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import useAuthToken from '../../helpers/useAuthToken';
import useLocalStorage from '../../helpers/useLocalStorage';

import Fights from './Fights';
import SelectGuild from './SelectGuild';

import { Layout } from 'antd';
const { Content } = Layout;

const attendanceQuery = ({ guild, server, region, pageSize = 5, page = 1 }) => `
{
    guildData {
        guild(
            name: "${guild}"
            serverSlug: "${server}"
            serverRegion: "${region}"
        ) {
            attendance(
                limit: ${pageSize}
                page: ${page}
            ) {
                total
                last_page
                data {
                    code
                    startTime
                    zone {
                        name
                    }
                }
            }
        }
    }
}`;

const Group = styled.div`
	margin-bottom: 2rem;
`;

function groupByZone(atts) {
	const byZone = {};
	atts?.forEach(att => {
		byZone[att.zone.name] = byZone[att.zone.name] || [];
		byZone[att.zone.name].push({ startTime: att.startTime, code: att.code });
	});
	return byZone;
}

export default function Index() {
	const token = useAuthToken();
	const [response, setResponse] = useState();
	const [guild, setGuild] = useLocalStorage('guild', {
		guild: 'season zero',
		server: 'frostmourne',
		region: 'us',
	});

	useEffect(() => {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		axios
			.post(
				'https://www.warcraftlogs.com/api/v2/client',
				{
					query: attendanceQuery(guild),
				},
				config
			)
			.then(resp => {
				setResponse(resp?.data?.data?.guildData?.guild);
			})
			.catch(console.error);
	}, [token, setResponse, guild]);

	const atnData = response?.attendance.data;
	const byZone = useMemo(() => groupByZone(atnData), [atnData]);

	return (
		<>
			<Content style={{ padding: '20px 50px' }}>
				<SelectGuild guild={guild} onChange={setGuild} />
			</Content>
			<Content style={{ padding: '20px 50px' }}>
				{byZone
					? Object.keys(byZone).map(key => {
							return (
								<div key={key}>
									<h3>{key}</h3>
									{byZone[key].map((data, index) => {
										console.log(data);
										return (
											<Group key={index}>
												{new Date(data.startTime).toLocaleString()}{' '}
												<Fights code={data.code} />
											</Group>
										);
									})}
								</div>
							);
					  })
					: null}
			</Content>
		</>
	);
}
