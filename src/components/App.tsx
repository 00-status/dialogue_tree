import './app.css';
import {Description} from "./Description/Description";
import {sections} from "../data/sectionData";
import {useEffect, useState} from "react";

export const App = () => {
    const [section, setSection] = useState(sections[0]);
    const [choices, setChoices] = useState<Array<Section>>([]);
    const [traits, setTraits] = useState<Array<string>>([]);

    useEffect(() => {
        const choices = sections.filter((currentSection) => {
            if (currentSection.prerequisite && !traits.includes(currentSection.prerequisite)) {
                return false;
            }

            return section.description !== currentSection.description
        });

        setChoices(choices);
    }, [section]);

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
