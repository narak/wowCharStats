// import styles from './index.module.css';

import { /*useEffect, useState, */ useMemo } from 'react';

import { Zone } from '../../../constants/WarcraftLogs';

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
			};
		});
	}
	return { byBoss: byBoss, bosses: Object.keys(bosses) };
}

console.log('See `wlDPSStats` to view consolidated stats.');

export default function Index() {
	const [chars, setChars] = useLocalStorage('warcraftlogs', []);
	const [zoneId, setZoneId] = useLocalStorage('wlZoneId', Zone.CN);
	const [bosses, setBosses] = useLocalStorage('bosses', {});
	const allStats = useWLCharStats({ zoneId, chars });

	const bossMap = bosses[zoneId]?.reduce((acc, boss) => {
		acc[boss] = true;
		return acc;
	}, {});

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
				if (bossMap[boss]) {
					acc.push({
						title: boss,
						dataIndex: boss,
						key: boss,
						defaultSortOrder: 'descend',
						sorter: (a, b) => {
							return a[boss] - b[boss];
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
							if (bossMap[val.boss]) {
								acc[val.boss] = val.bestAmount.toFixed(2);
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
				<ZoneSelector value={zoneId} onChange={setZoneId} />
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
