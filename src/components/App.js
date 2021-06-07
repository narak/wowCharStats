import styles from './app.module.css';

import useLocalStorage from '../helpers/useLocalStorage';

import { Layout, Menu } from 'antd';
import AddChar from './AddChar';
import Char from './Char';

const { Header, Content } = Layout;

function App() {
    const [tab, setTab] = useLocalStorage('selectedTab', ['1']);
    const [chars, setChars] = useLocalStorage('chars', []);

    function onAdd(char) {
        setChars([...chars, char]);
    }

    function onDelete(index) {
        setChars([...chars.slice(0, index), ...chars.slice(index + 1)]);
    }

    function onChangeTab({ keyPath }) {
        setTab(keyPath);
    }

    return (
        <Layout className={styles.app}>
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" selectedKeys={tab} onClick={onChangeTab}>
                    <Menu.Item key="1">Characters</Menu.Item>
                    <Menu.Item key="2">Guild Logs</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '20px 50px' }}>
                <div className="site-layout-content">
                    <AddChar onAdd={onAdd} />
                </div>
            </Content>
            <Content className={styles.cards}>
                {chars &&
                    chars.map((char, index) => (
                        <Char key={index} char={char} onDelete={onDelete.bind(this, index)} />
                    ))}
            </Content>
        </Layout>
    );
}

export default App;
