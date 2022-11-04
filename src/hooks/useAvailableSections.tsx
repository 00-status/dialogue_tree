import {sections} from "../data/sectionData";

type AvailableSections = {
    sections: Array<Section>
};
export const useAvailableSections = (
    sectionDescription: string,
    trait: string|null
): AvailableSections => {
    const filteredSections = sections.filter((section: Section) => {
        if (section.choiceLabel === null) {
            return false;
        }

        if (section.prerequisite && section.prerequisite !== trait) {
            return false;
        }

        return section.description !== sectionDescription;
    });

    return { sections: filteredSections };
};
