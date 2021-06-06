import './App.css';

import useLocalStorage from '../helpers/useLocalStorage';

import AddChar from './AddChar';
import Char from './Char';

function App() {
    const [chars, setChars] = useLocalStorage('chars', []);
    console.log(chars);

    function onAdd(char) {
        setChars([...chars, char]);
        console.log(char);
    }

    return (
        <div className="App">
            <AddChar onAdd={onAdd} />
            {chars && chars.map((char, index) => <Char key={index} char={char} />)}
        </div>
    );
}

export default App;
