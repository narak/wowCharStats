import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthToken from './useAuthToken';
import enqueue from './enqueue';

function serialize(char) {
	return `${char.region}:${char.server}:${char.name}`;
}

const query = ({ name, server, region }) => `
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
			)
		}
	}
}
`;

const _cache = {};
window.wlDPSStats = _cache;
console.log('See `wlDPSStats` to view fetched RIO data.');

export default function useWLCharStats(chars) {
	const token = useAuthToken();
	const [vals, setVals] = useState({});

	useEffect(() => {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		chars.forEach(char => {
			const key = serialize(char);

			if (_cache[key]) {
				if (!vals[key]) {
					setVals(vals => ({
						...vals,
						[key]: _cache[key],
					}));
				}
				return;
			}

			_cache[key] = {
				isFetching: true,
			};
			setVals(vals => ({
				...vals,
				[key]: _cache[key],
			}));

			axios
				.post(
					'https://www.warcraftlogs.com/api/v2/client',
					{
						query: query(char),
					},
					config
				)
				.then(val => {
					const charData = val?.data?.data?.characterData?.character;
					_cache[key] = charData
						? { ...charData, name: char.name }
						: {
								message: 'Found no character stats',
						  };
					enqueue(() =>
						setVals(vals => ({
							...vals,
							[key]: _cache[key],
						}))
					);
				})
				.catch(console.error);
		});
	}, [chars, token, setVals, vals]);

	return vals;
}
