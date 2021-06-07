import styles from './app.module.css';

import useLocalStorage from '../helpers/useLocalStorage';

import Characters from './chars';
import Guild from './guild';

import { Layout, Menu } from 'antd';
const { Header } = Layout;

const TabMap = {
    chars: Characters,
    guild: Guild,
};

function App() {
    const [tab, setTab] = useLocalStorage('selectedTab', ['chars']);

    function onChangeTab({ keyPath }) {
        setTab(keyPath);
    }

    const Tab = TabMap[tab[0]];

    return (
        <Layout className={styles.app}>
            <Header>
                <Menu theme="dark" mode="horizontal" selectedKeys={tab} onClick={onChangeTab}>
                    <Menu.Item key="chars">Characters</Menu.Item>
                    <Menu.Item key="guild">Guild Logs</Menu.Item>
                </Menu>
            </Header>
            <Tab />
        </Layout>
    );
}

export default App;
