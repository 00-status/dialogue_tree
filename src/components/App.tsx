import './app.css';
import {Description} from "./Description/Description";
import {sections} from "../data/sectionData";
import {useEffect, useState} from "react";

export const App = () => {
    const [currentSection, setCurrentSection] = useState(sections[0]);
    const [currentChoices, setCurrentChocies] = useState<Array<Section>>([]);

    useEffect(() => {
        const choices = sections.filter((section) => {
            return section.description !== currentSection.description
        });

        setCurrentChocies(choices);
    }, [currentSection]);

    return (
    <div className='app'>
        <h1>Dialogue Tree</h1>
        <Description label={currentSection.description} />
        {currentChoices.map((section) => {
            return <button key={section.description} onClick={() => {setCurrentSection(section)}}>
                {section.choiceLabel}
            </button>;
        })}
    </div>
    );
};
