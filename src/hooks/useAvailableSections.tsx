import {sections} from "../data/sectionData";

type AvailableSections = {
    sections: Array<Section>
};
export const useAvailableSections = (
    sectionDescription: string,
    traits: Array<string>
): AvailableSections => {
    const filteredSections = sections.filter((section: Section) => {
        if (section.prerequisite && !traits.includes(section.prerequisite)) {
            return false;
        }

        return section.description !== sectionDescription;
    });

    return { sections: filteredSections };
};
