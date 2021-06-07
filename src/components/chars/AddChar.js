import styles from './addchar.module.css';

import { useState } from 'react';
import Immutable from 'immutable';
import { Button, Input, Select } from 'antd';

const { Option } = Select;

export default function AddChar({ onAdd }) {
    const [char, setChar] = useState(Immutable.Map({ region: 'us', server: '', char: '' }));
    function onSubmit(e) {
        e.preventDefault();
        onAdd(char.toJS());
    }

    function onChangeSelect(key, value) {
        setChar(char.set(key, value));
    }
    function onChange(key, e) {
        setChar(char.set(key, e.target.value));
    }

    return (
        <div>
            <form onSubmit={onSubmit} className={styles.cont}>
                <div className={styles.field}>
                    <Select
                        style={{ width: 120 }}
                        value={char.get('region')}
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
                        value={char.get('server')}
                        placeholder="Server"
                        onChange={onChange.bind(this, 'server')}
                    />
                </div>
                <div className={styles.field}>
                    <Input
                        type="text"
                        name="char"
                        value={char.get('char')}
                        placeholder="Character"
                        onChange={onChange.bind(this, 'char')}
                    />
                </div>
                <div className={styles.field}>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </div>
            </form>
        </div>
    );
}
