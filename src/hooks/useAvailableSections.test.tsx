import {renderHook} from "@testing-library/react";
import {useAvailableSections} from "./useAvailableSections";

const TEST_CHOICE_ONE = 'Leads to choice 1';
const TEST_DESCRIPTION_ONE = 'Test Description One!';
const TEST_CHOICE_TWO = 'Leads to choice 2';
const TEST_DESCRIPTION_TWO = 'Test Description Two!';
const TEST_TRAIT_TWO = 'Trait Two!';
const TEST_DESCRIPTION_THREE = 'Description 3';
const TEST_CHOICE_FOUR = 'Leads to section 4';
const TEST_DESCRIPTION_FOUR = 'Description four';

jest.mock('../data/sectionData', () => {
    return {
        __esModule: true,
        sections: [
            {
                choiceLabel: TEST_CHOICE_ONE,
                description: TEST_DESCRIPTION_ONE,
                trait: null,
                prerequisite: null
            },
            {
                choiceLabel: TEST_CHOICE_TWO,
                description: TEST_DESCRIPTION_TWO,
                trait: null,
                prerequisite: TEST_TRAIT_TWO
            },
            {
                choiceLabel: null,
                description: TEST_DESCRIPTION_THREE,
                trait: null,
                prerequisite: null
            },
            {
                choiceLabel: TEST_CHOICE_FOUR,
                description: TEST_DESCRIPTION_FOUR,
                trait: null,
                prerequisite: null
            },
        ]
    };
});

describe('useAvailableSections', () => {
    it('should return sections have their prerequisites met. Should not return sections with no label. Should NOT return sections with null prerequisite.', () => {
        const { result } = renderHook(() => useAvailableSections(TEST_DESCRIPTION_ONE, TEST_TRAIT_TWO));

        const expected = {
            sections: [
                {
                    choiceLabel: TEST_CHOICE_TWO,
                    description: TEST_DESCRIPTION_TWO,
                    trait: null,
                    prerequisite: TEST_TRAIT_TWO
                },
            ]
        };
        expect(result.current).toEqual(expected);
    });

    it('should NOT return the current section', () => {
        const { result } = renderHook(() => useAvailableSections(TEST_DESCRIPTION_TWO, TEST_TRAIT_TWO));

        expect(result.current.sections).toHaveLength(0);
    });
});
