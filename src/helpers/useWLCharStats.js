import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthToken from './useAuthToken';

function serialize(char) {
	return `${char.region}:${char.server}:${char.name}`;
}

const fightsQuery = ({ name, server, region }) => `
{
  characterData {
    character(
      name: "${name}"
      serverSlug: "${server}"
      serverRegion: "${region}"
    ) {
      zoneRankings(
        difficulty: 4
        zoneID: 26
        specName: "Balance"
      )
    }
  }
}
`;

const _charStats = {};
window.charStats = _charStats;
console.log('See `charStats` to view fetched RIO data.');

export default function useRaiderIOStats(char) {
	const token = useAuthToken();
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
}
