import './app.css';
import {Description} from "./Description/Description";
import {sections} from "../data/sectionData";
import {useState} from "react";
import {useAvailableSections} from "../hooks/useAvailableSections";

export const App = () => {
    const [section, setSection] = useState(sections[0]);
    const [traits, setTraits] = useState<Array<string>>([]);

    const { sections: choices } = useAvailableSections(section.description, traits);

    const onChoiceClick = (section: Section) => {
        setSection(section);

        if (section.trait && !traits.includes(section.trait)) {
            traits.push(section.trait);
            setTraits([...traits]);
        }
    };

    return (
    <div className='app'>
        <h1>Dialogue Tree</h1>
        <ul>
            {traits.map((trait: string) => <li key={trait}>{trait}</li>)}
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
