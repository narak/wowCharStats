import styles from './app.module.css';

import useLocalStorage from '../helpers/useLocalStorage';

import RaiderIO from './raiderio';
import WarcraftLogs from './warcraftlogs';

import { Layout, Menu } from 'antd';
const { Header } = Layout;

const Tabs = {
    RAIDERIO: 'rio',
    WARCRAFTLOGS: 'wcl',
};

const TabMap = {
    [Tabs.RAIDERIO]: RaiderIO,
    [Tabs.WARCRAFTLOGS]: WarcraftLogs,
};

function App() {
    const [tab, setTab] = useLocalStorage('selectedTab', [Tabs.RAIDERIO]);

    function onChangeTab({ keyPath }) {
        setTab(keyPath);
    }

    const Tab = TabMap[tab[0]];

    return (
        <Layout className={styles.app}>
            <Header>
                <Menu theme="dark" mode="horizontal" selectedKeys={tab} onClick={onChangeTab}>
                    <Menu.Item key={Tabs.RAIDERIO}>Raider.IO</Menu.Item>
                    <Menu.Item key={Tabs.WARCRAFTLOGS}>Warcraft Logs</Menu.Item>
                </Menu>
            </Header>
            <Tab />
        </Layout>
    );
}

export default App;
