import {act, render} from "@testing-library/react";
import {App} from "./App";
import * as UseAvailableSections from "../hooks/useAvailableSections";

const TEST_CHOICE_ONE = 'Leads to choice 1';
const TEST_DESCRIPTION_ONE = 'Test Description One!';
const TEST_CHOICE_TWO = 'Leads to choice 2';
const TEST_DESCRIPTION_TWO = 'Test Description Two!';
const TEST_TRAIT_TWO = 'Trait Two!';
const TEST_CHOICE_THREE = 'Leads to choice 3';
const TEST_DESCRIPTION_THREE = 'Test Description Three!';
const TEST_TRAIT_THREE = 'Trait Three!';

jest.mock('../data/sectionData', () => {
    return {
        __esModule: true,
        sections: [
            {
                choiceLabel: TEST_CHOICE_ONE,
                description: TEST_DESCRIPTION_ONE
            },
        ]
    };
});

describe('App', () => {
    beforeEach(() => {
        jest.spyOn(UseAvailableSections, 'useAvailableSections').mockReturnValue(
            {
                sections: [
                    {
                        choiceLabel: TEST_CHOICE_ONE,
                        description: TEST_DESCRIPTION_ONE,
                        prerequisite: null,
                        trait: null
                    },
                    {
                        choiceLabel: TEST_CHOICE_TWO,
                        description: TEST_DESCRIPTION_TWO,
                        prerequisite: null,
                        trait: TEST_TRAIT_TWO
                    },
                    {
                        choiceLabel: TEST_CHOICE_THREE,
                        description: TEST_DESCRIPTION_THREE,
                        prerequisite: null,
                        trait: TEST_TRAIT_THREE
                    }
                ]
            }
        );
    });

    it('should display the main header', () => {
        const { getByText } = render(<App />);

        getByText('Dialogue Tree');
    });

    it('should display a section description', () => {
        const { getByText } = render(<App />);

        getByText(TEST_DESCRIPTION_ONE);
    });

    it('should render several choices', () => {
        const { getByText } = render(<App />);

        getByText(TEST_CHOICE_TWO);
        getByText(TEST_CHOICE_THREE);
    });

    it('should render the current trait when a section with a trait is clicked.', async () => {
        const { getByText, queryByText } = render(<App />);

        expect(queryByText(TEST_TRAIT_TWO)).toBeNull();

        await act(() => {
            getByText(TEST_CHOICE_TWO).click();
        });

        getByText(TEST_TRAIT_TWO);
    });

    it('should NOT render multiple traits', async () => {
        const { getByText, getAllByText } = render(<App />);

        await act(() => {
            getByText(TEST_CHOICE_TWO).click();
        });
        await act(() => {
            getByText(TEST_CHOICE_TWO).click();
        });

        expect(getAllByText(TEST_TRAIT_TWO)).toHaveLength(1);
    });
});
