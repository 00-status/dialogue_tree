import './app.css';
import {Description} from "./Description/Description";
import {sections} from "../data/sectionData";
import {useEffect, useState} from "react";

export const App = () => {
    const [currentSection, setCurrentSection] = useState(sections[0]);
    const [currentChoices, setCurrentChocies] = useState<Array<Section>>([]);
    const [traits, setTraits] = useState<Array<string>>([]);

    useEffect(() => {
        const choices = sections.filter((section) => {
            if (section.prerequisite && !traits.includes(section.prerequisite)) {
                return false;
            }

            return section.description !== currentSection.description
        });

        setCurrentChocies(choices);
    }, [currentSection]);

    const onChoiceClick = (section: Section) => {
        setCurrentSection(section);

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
        <Description label={currentSection.description} />
        {currentChoices.map((section) => {
            return <button key={section.description} onClick={() => onChoiceClick(section)}>
                {section.choiceLabel}
            </button>;
        })}
    </div>
    );
};
