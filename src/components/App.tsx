import './app.css';
import {Description} from "./Description/Description";

export const App = () => {
    return (
    <div className='app'>
        <h1>Dialogue Tree</h1>
        <Description />
        <button onClick={() => console.log('choice 1!')}>Choice 1</button>
        <button onClick={() => console.log('choice 2!')}>Choice 2</button>
    </div>
    );
};
