import { useState } from 'react';
import Immutable from 'immutable';

export default function AddChar({ onAdd }) {
    const [char, setChar] = useState(
        Immutable.Map({ region: 'us', server: 'frostmourne', char: '' })
    );
    function onSubmit(e) {
        e.preventDefault();
        onAdd(char.toJS());
    }

    function onChange(key, e) {
        setChar(char.set(key, e.target.value));
    }

    return (
        <div className="App">
            Add character:{' '}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="region"
                    value={char.get('region')}
                    placeholder="Region"
                    onChange={onChange.bind(this, 'region')}
                />
                <input
                    type="text"
                    name="server"
                    value={char.get('server')}
                    placeholder="Server"
                    onChange={onChange.bind(this, 'server')}
                />
                <input
                    type="text"
                    name="char"
                    value={char.get('char')}
                    placeholder="Character"
                    onChange={onChange.bind(this, 'char')}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}
