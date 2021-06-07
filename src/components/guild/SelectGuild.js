import styles from './selectguild.module.css';

import { useState } from 'react';
import { Button, Input, Select } from 'antd';

const { Option } = Select;

export default function SelectGuild({ guild: _guild, onChange: _onChangeParent }) {
	const [guild, setGuild] = useState(_guild);
	function onSubmit(e) {
		e.preventDefault();
		_onChangeParent(guild);
	}

	function onChangeSelect(key, value) {
		setGuild({ ...guild, [key]: value });
	}
	function onChange(key, e) {
		setGuild({ ...guild, [key]: e.target.value });
	}
	return (
		<form onSubmit={onSubmit} className={styles.cont}>
			<div className={styles.field}>
				<Select
					style={{ width: 120 }}
					value={guild.region}
					onChange={onChangeSelect.bind(this, 'region')}
				>
					<Option value="us">us</Option>
					<Option value="eu">eu</Option>
					<Option value="tw">tw</Option>
					<Option value="kr">kr</Option>
					<Option value="cn">cn</Option>
				</Select>
			</div>
			<div className={styles.field}>
				<Input
					type="text"
					name="server"
					value={guild.server}
					placeholder="Server"
					onChange={onChange.bind(this, 'server')}
				/>
			</div>
			<div className={styles.field}>
				<Input
					type="text"
					name="guild"
					value={guild.guild}
					placeholder="Character"
					onChange={onChange.bind(this, 'guild')}
				/>
			</div>
			<div className={styles.field}>
				<Button type="primary" htmlType="submit">
					Add
				</Button>
			</div>
		</form>
	);
}
