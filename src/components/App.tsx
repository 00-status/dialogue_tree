import './app.css';
import {Description} from "./Description/Description";
import {sections} from "../data/sectionData";

export const App = () => {
    // We need the idea of a "dialogue tree".
    // Clicking an option takes the user to the "next dialogue".
        // I'm going to name dialogues Sections.

    // The choices are just a list of sections
        // Each section has a choiceLabel on it that we can use for its choice's label.
        // In this way, choices and events are the same thing.

    const firstSection = sections[0];

    const choices = sections.filter((section) => {
        return section.description !== firstSection.description
    }).map((section) => {
        return <button key={section.description} onClick={() => console.log(section.description)}>
            {section.choiceLabel}
        </button>;
    });

    return (
    <div className='app'>
        <h1>Dialogue Tree</h1>
        <Description label={firstSection.description} />
        {choices}
    </div>
    );
};
