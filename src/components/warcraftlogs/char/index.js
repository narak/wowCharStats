// import styles from './index.module.css';

import { /*useEffect, useState, */ useMemo } from 'react';

import { Zone, Difficulty } from '../../../constants/WarcraftLogs';
import { ShortName } from '../../../constants/Boss';

import useLocalStorage from '../../../helpers/useLocalStorage';
import useWLCharStats from '../../../helpers/useWLCharStats';

import { Layout, Table } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import AddChar from '../../common/AddChar';
import ZoneSelector from './ZoneSelector';
import BossSelector from './BossSelector';

const { Content } = Layout;

function consolidateByBoss(allStats) {
	let byBoss = {},
		bosses = {};

	for (const key in allStats) {
		const val = allStats[key];

		if (val.isFetching || val.isError) continue;

		const name = val.name,
			rankings = val.zoneRankings?.rankings;

		// eslint-disable-next-line
		byBoss[name] = rankings?.map(rank => {
			const boss = rank.encounter.name;

			if (!bosses[boss]) {
				bosses[boss] = true;
			}

			return {
				boss,
				bestAmount: rank.bestAmount,
				bestSpec: rank.bestSpec,
			};
		});
	}
	return { byBoss: byBoss, bosses: Object.keys(bosses) };
}

console.log('See `wlDPSStats` to view consolidated stats.');

export default function Index() {
	const [chars, setChars] = useLocalStorage('wlTrackedChars', []);
	const [zone, setZone] = useLocalStorage('wlZone', {
		id: Zone.SOD,
		difficulty: Difficulty.Heroic,
	});
	const { id: zoneId } = zone;
	const [bosses, setBosses] = useLocalStorage('bosses', {});
	const allStats = useWLCharStats({ zone, chars });

	const bossMap =
		bosses[zoneId] && bosses[zoneId].length
			? bosses[zoneId].reduce((acc, boss) => {
					acc[boss] = true;
					return acc;
			  }, {})
			: null;

	const stats = useMemo(() => {
		return consolidateByBoss(allStats);
	}, [allStats]);
	window.wlDPSStats = stats;

	function onAdd(char) {
		setChars([...chars, char]);
	}

	function onChangeSelectedBosses(value) {
		setBosses({ ...bosses, [zoneId]: value });
	}

	const columns = useMemo(() => {
		function onDelete(index) {
			setChars([...chars.slice(0, index), ...chars.slice(index + 1)]);
		}

		let columns;
		if (stats.bosses.length) {
			columns = stats.bosses.reduce((acc, boss) => {
				if (!bossMap || bossMap[boss]) {
					acc.push({
						title: ShortName[boss],
						dataIndex: boss,
						key: boss,
						defaultSortOrder: 'descend',
						render: (text, record, index) => {
							if (+record[boss].value === 0) {
								return '-';
							} else {
								return (
									<>
										{record[boss].value}
										<br />
										<small>{record[boss].spec}</small>
									</>
								);
							}
						},
						sorter: (a, b) => {
							return a[boss].value - b[boss].value;
						},
					});
				}
				return acc;
			}, []);
		} else {
			columns = [];
		}
		return [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
			},
			...columns,
			{
				dataIndex: 'action',
				key: 'action',
				render: (text, record, index) => {
					return <DeleteFilled onClick={onDelete.bind(this, index)} />;
				},
			},
		];
	}, [stats, chars, setChars, bossMap]);

	const dataSource = useMemo(() => {
		const dataSource = [];

		if (stats.bosses.length) {
			chars.forEach(({ name }) => {
				if (stats.byBoss[name]) {
					dataSource.push({
						name,
						key: name,
						...stats.byBoss[name].reduce((acc, val) => {
							if (!bossMap || bossMap[val.boss]) {
								acc[val.boss] = {
									value: val.bestAmount.toFixed(2),
									spec: val.bestSpec,
								};
							}
							return acc;
						}, {}),
					});
				}
			});
		}
		return dataSource;
	}, [stats, chars, bossMap]);

	return (
		<>
			<Content style={{ padding: '50px 50px 10px' }}>
				<AddChar onAdd={onAdd} />
			</Content>
			<Content style={{ padding: '10px 50px' }}>
				<ZoneSelector value={zone} onChange={setZone} />
			</Content>
			<Content style={{ padding: '10px 50px 10px' }}>
				<BossSelector
					bosses={stats && stats.bosses ? stats.bosses : undefined}
					value={bosses[zoneId]}
					onChange={onChangeSelectedBosses}
				/>
			</Content>
			<Content style={{ padding: '20px 50px' }}>
				<Table dataSource={dataSource} columns={columns} pagination={false} />
			</Content>
		</>
	);
}
