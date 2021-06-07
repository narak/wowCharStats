import styles from './app.module.css';

import useLocalStorage from '../helpers/useLocalStorage';

import { Layout } from 'antd';
import AddChar from './AddChar';
import Char from './Char';

const { Header, Content } = Layout;

function App() {
    const [chars, setChars] = useLocalStorage('chars', []);

    function onAdd(char) {
        setChars([...chars, char]);
    }

    function onDelete(index) {
        setChars([...chars.slice(0, index), ...chars.slice(index + 1)]);
    }

    return (
        <div className={styles.app}>
            <Layout>
                <Header>
                    <AddChar onAdd={onAdd} />
                </Header>
                <Content className={styles.cards}>
                    {chars &&
                        chars.map((char, index) => (
                            <Char key={index} char={char} onDelete={onDelete.bind(this, index)} />
                        ))}
                </Content>
            </Layout>
        </div>
    );
}

export default App;
