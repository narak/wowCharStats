// import styles from './index.module.css';

import { /*useEffect, useState, */ useMemo, useCallback } from 'react';

import { Zone, Difficulty } from '../../../constants/WarcraftLogs';
import { ShortName } from '../../../constants/Boss';

import useLocalStorage from '../../../helpers/useLocalStorage';
import useWLCharStats from '../../../helpers/useWLCharStats';
import { byBoss } from '../../../helpers/consolidateWLStats';

import { Layout, Table, Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import AddChar from '../../common/AddChar';
import ZoneSelector from './ZoneSelector';
import BossSelector from './BossSelector';
import CopyPaste from './CopyPaste';

const { Content } = Layout;

function cleanServer(realm) {
	return realm.replace(/-|\s/g, '').toLowerCase();
}

console.log('See `wlDPSStats` to view consolidated stats.');

export default function Index() {
	const [chars, setChars] = useLocalStorage('wlTrackedChars', []);
	const [zone, setZone] = useLocalStorage('wlZone', {
		id: Zone.SOD,
		difficulty: Difficulty.Heroic,
	});
	const { id: zoneId } = zone;
	const [bosses, setBosses] = useLocalStorage('wlBosses', {});
	const allStats = useWLCharStats({ zone, chars });

	const bossMap =
		bosses[zoneId] && bosses[zoneId].length
			? bosses[zoneId].reduce((acc, boss) => {
					acc[boss] = true;
					return acc;
			  }, {})
			: null;

	const stats = useMemo(() => {
		return byBoss(allStats);
	}, [allStats]);
	window.wlDPSStats = stats;

	function onAdd(char) {
		let { name, server, region } = char;
		name = name.toLowerCase();
		server = cleanServer(server);
		region = region.toLowerCase();
		const exists = chars.some(_char => {
			const _server = cleanServer(_char.server);
			if (
				_char.name.toLowerCase() === name &&
				_server === server &&
				_char.region.toLowerCase() === region
			) {
				console.warn('User already exists');
				return true;
			} else {
				return false;
			}
		});

		if (!exists) {
			setChars([...chars, char]);
		}
	}

	function onChangeSelectedBosses(value) {
		setBosses({ ...bosses, [zoneId]: value });
	}

	const onDelete = useCallback(
		name => {
			setChars(chars.filter(char => char.name !== name));
		},
		[setChars, chars]
	);

	const columns = useMemo(() => {
		let columns;
		if (stats.bosses.length) {
			columns = stats.bosses.reduce((acc, boss) => {
				if (!bossMap || bossMap[boss]) {
					acc.push({
						title: ShortName[boss],
						dataIndex: boss,
						key: boss,
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
				render: (text, record) => {
					return <DeleteFilled onClick={onDelete.bind(this, record.name)} />;
				},
			},
		];
	}, [stats, bossMap, onDelete]);

	const [dataSource, failedChars] = useMemo(() => {
		const dataSource = [];
		const failedChars = [];

		if (stats.bosses.length) {
			chars.forEach(({ name }) => {
				const bossStats = stats.byBoss[name];
				if (bossStats && !bossStats.isError) {
					dataSource.push({
						name,
						key: name,
						...bossStats.reduce((acc, val) => {
							if (!bossMap || bossMap[val.boss]) {
								acc[val.boss] = {
									value: val.bestAmount.toFixed(2),
									spec: val.bestSpec,
								};
							}
							return acc;
						}, {}),
					});
				} else {
					failedChars.push(bossStats);
				}
			});
		}
		return [dataSource, failedChars];
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
				<CopyPaste chars={chars} setChars={setChars} />
			</Content>
			<Content style={{ padding: '10px 50px' }}>
				{failedChars.length ? (
					<div style={{ padding: '0 1px' }}>
						<strong>Failed to fetch</strong>:{' '}
						{failedChars.map(char =>
							char ? (
								<Button type="text" onClick={onDelete.bind(this, char.name)}>
									{char.name}
								</Button>
							) : null
						)}
					</div>
				) : null}
				<Table dataSource={dataSource} columns={columns} pagination={false} />
			</Content>
		</>
	);
}
