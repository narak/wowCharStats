import { useEffect, useState } from 'react';
import axios from 'axios';

function serialize(char) {
	return `${char.region}:${char.server}:${char.name}`;
}

function url(char) {
	return `https://raider.io/api/v1/characters/profile?region=${char.region}&realm=${char.server}&name=${char.name}&fields=mythic_plus_scores_by_season:current,mythic_plus_best_runs`;
}

const _cache = {};
window.rioStats = _cache;
console.log('See `rioStats` to view fetched RIO data.');

export default function useRaiderIOStats(char) {
	const key = serialize(char);
	const [rioStats, setRIOStats] = useState(_cache);
	useEffect(() => {
		if (!rioStats[key]) {
			console.log('Fetching', key);
			axios
				.get(url(char))
				.then(resp => {
					_cache[key] = resp.data;
					setRIOStats({
						...rioStats,
						[key]: resp.data,
					});
				})
				.catch(function (error) {
					setRIOStats({
						...rioStats,
						[key]: error.response.data,
					});
					console.log(error);
				});
		}
	}, [key, char, rioStats, setRIOStats]);
	return rioStats[key];
}
