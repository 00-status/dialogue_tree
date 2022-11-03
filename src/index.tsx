import ReactDOM from 'react-dom';
import {App} from "./components/App";

const test: String = 'Hello World!';
const test2: String = "2";

console.log(test);
console.log(test2);
const appRoot = document.getElementById('app');

if (appRoot) {
    ReactDOM.render(<App />, appRoot);
}
