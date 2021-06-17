// import styles from './index.module.css';

import { useEffect, useState } from 'react';

import useLocalStorage from '../../../helpers/useLocalStorage';
import useWLCharStats from '../../../helpers/useWLCharStats';

import { Layout } from 'antd';
import AddChar from '../../common/AddChar';
// import Char from './Char';

const { Content } = Layout;

function consolidateByBoss(prevStats, allStats) {
	const { byBoss = {}, bosses = {} } = prevStats;
	let newByBoss = byBoss,
		newBosses = bosses;

	// eslint-disable-next-line
	for (const key in allStats) {
		const val = allStats[key];

		if (val.isFetching) continue;
		const name = val.name,
			rankings = val.zoneRankings?.rankings;

		if (byBoss[name]) continue;

		if (newByBoss === byBoss) {
			newByBoss = { ...byBoss };
		}

		newByBoss[name] = rankings?.map(rank => {
			const boss = rank.encounter.name;

			if (!bosses[boss]) {
				if (newBosses === bosses) {
					newBosses = { ...bosses };
				}

				newBosses = {
					...newBosses,
					[boss]: true,
				};
			}

			return {
				boss,
				bestAmount: rank.bestAmount,
			};
		});
	}
	return newByBoss !== byBoss || newBosses !== bosses
		? { byBoss: newByBoss, bosses: newBosses }
		: prevStats;
}

export default function Index() {
	const [chars, setChars] = useLocalStorage('warcraftlogs', []);
	const allStats = useWLCharStats(chars);

	const [stats, setStats] = useState({});
	useEffect(() => {
		const newStats = consolidateByBoss(stats, allStats);
		if (newStats !== stats) {
			setStats(newStats);
		}
	}, [stats, allStats]);

	function onAdd(char) {
		setChars([...chars, char]);
	}

	function onDelete(index) {
		setChars([...chars.slice(0, index), ...chars.slice(index + 1)]);
	}

	console.log(stats);

	return (
		<>
			<h1>Under construction</h1>
			<Content style={{ padding: '20px 50px' }}>
				<AddChar onAdd={onAdd} />
			</Content>
			<Content style={{ padding: '0 50px 20px' }}>
				{chars &&
					chars.map((char, index) => (
						<div key={index}>
							<pre>{JSON.stringify(char, undefined, '  ')}</pre>
							<button onClick={onDelete.bind(this, index)}>delete</button>
						</div>
					))}
			</Content>
		</>
	);
}
