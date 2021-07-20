import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthToken from './useAuthToken';
import enqueue from './enqueue';

import { ZoneId } from '../constants/WarcraftLogs';

function serialize(char) {
	return `${char.region}:${char.server}:${char.name}`;
}

const query = (zoneId, { name, server, region }) => `
{
	characterData {
		character(
			name: "${name}"
			serverSlug: "${server}"
			serverRegion: "${region}"
		) {
			zoneRankings(
				difficulty: 4
				zoneID: ${zoneId}
			)
		}
	}
}
`;

const _zoneCache = {};
window.wlCharStats = _zoneCache;
console.log('See `wlCharStats` to view fetched RIO data.');

export default function useWLCharStats({ zoneId, chars }) {
	if (!_zoneCache[zoneId]) {
		_zoneCache[zoneId] = {};
	}

	const token = useAuthToken();
	const [zoneVals, setZoneVals] = useState({});
	const vals = zoneVals[zoneId];
	const _cache = _zoneCache[zoneId];

	useEffect(() => {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		function setVals(_vals) {
			setZoneVals(vals => ({
				...vals,
				[zoneId]: _vals(vals[zoneId]),
			}));
		}

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
						query: query(ZoneId[zoneId], char),
					},
					config
				)
				.then(val => {
					const charData = val?.data?.data?.characterData?.character;
					_cache[key] = charData
						? { ...charData, name: char.name }
						: {
								message: 'Found no character stats',
								isError: true,
						  };

					if (val?.data?.errors) {
						console.error(val.data.errors.map(e => e.message));
					}
					enqueue(() =>
						setVals(vals => ({
							...vals,
							[key]: _cache[key],
						}))
					);
				})
				.catch(console.error);
		});
	}, [zoneId, chars, token, setZoneVals, vals, _cache]);

	return vals;
}
