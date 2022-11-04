import './app.css';
import {Description} from "./Description/Description";
import {sections} from "../data/sectionData";
import {useState} from "react";
import {useAvailableSections} from "../hooks/useAvailableSections";

export const App = () => {
    const [section, setSection] = useState(sections[0]);
    const [trait, setTrait] = useState<string|null>(null);

    const { sections: choices } = useAvailableSections(section.description, trait);

    const onChoiceClick = (section: Section) => {
        setSection(section);
        setTrait(section.trait);
    };

    return (
    <div className='app'>
        <h1>Dialogue Tree</h1>
        <ul>
            {trait && <li key={trait}>{trait}</li>}
        </ul>
        <Description label={section.description} />
        {choices.map((section) => {
            return <button key={section.description} onClick={() => onChoiceClick(section)}>
                {section.choiceLabel}
            </button>;
        })}
    </div>
    );
};
