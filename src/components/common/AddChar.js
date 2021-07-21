import styles from './addchar.module.css';

import { useState } from 'react';
import { Button, Input, Select } from 'antd';

const { Option } = Select;

export default function AddChar({ onAdd }) {
    const [char, setChar] = useState({ region: 'us', server: 'frostmourne', name: '' });
    function onSubmit(e) {
        e.preventDefault();
        onAdd(char);
    }

    function onChangeSelect(key, value) {
        setChar({ ...char, [key]: value });
    }
    function onChange(key, e) {
        setChar({ ...char, [key]: e.target.value });
    }

    return (
        <form onSubmit={onSubmit} className={styles.cont}>
            <div className={styles.field}>
                <Select
                    style={{ width: 120 }}
                    value={char.region}
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
                    value={char.server}
                    placeholder="Server"
                    onChange={onChange.bind(this, 'server')}
                />
            </div>
            <div className={styles.field}>
                <Input
                    type="text"
                    name="char"
                    value={char.name}
                    placeholder="Character"
                    onChange={onChange.bind(this, 'name')}
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
