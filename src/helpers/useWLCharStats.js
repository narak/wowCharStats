import { useEffect, useState } from 'react';
import axios from 'axios';
import useWCLAuthToken from './useWCLAuthToken';

import { ZoneId, DifficultyId } from '../constants/WarcraftLogs';

function serialize({ id, difficulty }, { name, server, region }) {
	return `${id}:${difficulty}:${region}:${server}:${name}`;
}

const query = ({ id, difficulty }, { name, server, region }) => `
{
	characterData {
		character(
			name: "${name}"
			serverSlug: "${server}"
			serverRegion: "${region}"
		) {
			zoneRankings(
				difficulty: ${DifficultyId[difficulty]}
				zoneID: ${ZoneId[id]}
				role: DPS
				metric: dps
			)
		}
	}
}
`;

const _cache = {};
window.wlCharStats = _cache;
console.log('See `wlCharStats` to view fetched RIO data.');

export default function useWLCharStats({ zone, chars }) {
	const token = useWCLAuthToken();
	const [vals, setVals] = useState({});
	const [_zone, setZone] = useState(zone);
	if (zone !== _zone) {
		setZone(zone);
		setVals({});
	}

	useEffect(() => {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		chars.forEach(char => {
			const key = serialize(zone, char);

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
						query: query(zone, char),
					},
					config
				)
				.then(val => {
					const charData = val?.data?.data?.characterData?.character;
					_cache[key] = charData
						? { ...charData, ...zone, ...char }
						: {
								message: 'Found no character stats',
								isError: true,
								...zone,
								...char,
						  };

					if (val?.data?.errors) {
						console.error(val.data.errors.map(e => e.message));
					}
					setVals(vals => ({
						...vals,
						[key]: _cache[key],
					}));
				})
				.catch(console.error);
		});
	}, [zone, chars, token, vals]);

	return vals;
}
