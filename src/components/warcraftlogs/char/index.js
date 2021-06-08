// import styles from './index.module.css';

import useLocalStorage from '../../../helpers/useLocalStorage';

import { Layout } from 'antd';
import AddChar from '../../common/AddChar';
// import Char from './Char';

const { Content } = Layout;

export default function Index() {
	const [chars, setChars] = useLocalStorage('warcraftlogs', []);

	function onAdd(char) {
		setChars([...chars, char]);
	}

	function onDelete(index) {
		setChars([...chars.slice(0, index), ...chars.slice(index + 1)]);
	}

	console.log(chars);

	return (
		<>
			<Content style={{ padding: '20px 50px' }}>
				<AddChar onAdd={onAdd} />
			</Content>
			<Content style={{ padding: '0 50px 20px' }}>
				{chars &&
					chars.map((char, index) => <pre>{JSON.stringify(char, undefined, '  ')}</pre>)}
			</Content>
		</>
	);
}
