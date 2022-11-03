import ReactDOM from 'react-dom';
import {App} from "./components/App";

const appRoot = document.getElementById('app');

if (appRoot) {
    ReactDOM.render(<App />, appRoot);
}
