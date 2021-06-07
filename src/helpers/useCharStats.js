import { useEffect, useState } from 'react';
import axios from 'axios';

function serialize(char) {
	return `${char.region}:${char.server}:${char.char}`;
}

function url(char) {
	return `https://raider.io/api/v1/characters/profile?region=${char.region}&realm=${char.server}&name=${char.char}&fields=mythic_plus_scores_by_season:current,mythic_plus_best_runs`;
}

const _charStats = {};
window.charStats = _charStats;
console.log('See `charStats` to view fetched RIO data.');

export default function useCharStats(char) {
	const key = serialize(char);
	const [charStats, setCharStats] = useState(_charStats);
	useEffect(() => {
		if (!charStats[key]) {
			console.log('Fetching', key);
			axios
				.get(url(char))
				.then(resp => {
					_charStats[key] = resp.data;
					setCharStats({
						...charStats,
						[key]: resp.data,
					});
				})
				.catch(function (error) {
					setCharStats({
						...charStats,
						[key]: error.response.data,
					});
					console.log(error);
				});
		}
	}, [key, char, charStats, setCharStats]);
	return charStats[key];
}
