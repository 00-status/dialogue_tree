import {act, render} from "@testing-library/react";
import {App} from "./App";
import * as UseAvailableSections from "../hooks/useAvailableSections";

const TEST_CHOICE_ONE = 'Leads to choice 1';
const TEST_DESCRIPTION_ONE = 'Test Description One!';
const TEST_CHOICE_TWO = 'Leads to choice 2';
const TEST_DESCRIPTION_TWO = 'Test Description Two!';
const TEST_CHOICE_THREE = 'Leads to choice 3';
const TEST_DESCRIPTION_THREE = 'Test Description Three!';
const TEST_SHARED_TRAIT = 'Test Shared Trait!';

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
                        trait: TEST_SHARED_TRAIT
                    },
                    {
                        choiceLabel: TEST_CHOICE_THREE,
                        description: TEST_DESCRIPTION_THREE,
                        prerequisite: null,
                        trait: TEST_SHARED_TRAIT
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

    it('should render a trait when a section with a trait is clicked.', async () => {
        const { getByText, queryByText } = render(<App />);

        expect(queryByText(TEST_SHARED_TRAIT)).toBeNull();

        await act(() => {
            getByText(TEST_CHOICE_TWO).click();
        });

        getByText(TEST_SHARED_TRAIT);
    });

    it('should NOT render multiple traits of the same name.', async () => {
        const { getByText, getAllByText } = render(<App />);

        await act(() => {
            getByText(TEST_CHOICE_TWO).click();
        });
        await act(() => {
            getByText(TEST_CHOICE_THREE).click();
        });

        expect(getAllByText(TEST_SHARED_TRAIT)).toHaveLength(1);
    });
});
