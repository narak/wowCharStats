import { Zone, ZoneLabel } from '../../../constants/WarcraftLogs';

import { Select } from 'antd';
const { Option } = Select;

const Zones = Object.keys(Zone);

export default function ZoneSelector({ value, onChange }) {
    return (
        <div>
            <Select style={{ width: 240 }} value={value} onChange={onChange}>
                {Zones.map(key => {
                    return (
                        <Option value={key} key={key}>
                            {ZoneLabel[key]}
                        </Option>
                    );
                })}
            </Select>
        </div>
    );
}
