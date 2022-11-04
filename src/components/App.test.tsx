import {act, render} from "@testing-library/react";
import {App} from "./App";

const TEST_CHOICE_ONE = 'Leads to choice 1';
const TEST_DESCRIPTION_ONE = 'Test Description One!';
const TEST_CHOICE_TWO = 'Leads to choice 2';
const TEST_DESCRIPTION_TWO = 'Test Description Two!';
const TEST_CHOICE_THREE = 'Leads to choice 3';
const TEST_DESCRIPTION_THREE = 'Test Description Three!';
const TEST_SHARED_TRAIT = 'Test Shared Trait!';

const TEST_CHOICE_FOUR = 'Leads to section 4';
const TEST_DESCRIPTION_FOUR = 'Test Description Four!';

jest.mock('../data/sectionData', () => {
    return {
        __esModule: true,
        sections: [
            {
                choiceLabel: TEST_CHOICE_ONE,
                description: TEST_DESCRIPTION_ONE
            },
            {
                choiceLabel: TEST_CHOICE_TWO,
                description: TEST_DESCRIPTION_TWO,
                trait: TEST_SHARED_TRAIT
            },
            {
                choiceLabel: TEST_CHOICE_THREE,
                description: TEST_DESCRIPTION_THREE,
                trait: TEST_SHARED_TRAIT
            },
            {
                choiceLabel: TEST_CHOICE_FOUR,
                description: TEST_DESCRIPTION_FOUR,
                prerequisite: TEST_SHARED_TRAIT,
                trait: null
            },
        ]
    };
});

describe('App', () => {
    it('should display the main header', () => {
        const { getByText } = render(<App />);

        getByText('Dialogue Tree');
    });

    it('should display a section description', () => {
        const { getByText } = render(<App />);

        getByText(TEST_DESCRIPTION_ONE);
    });

    it('should render several choices as buttons', () => {
        const { getByText } = render(<App />);

        getByText(TEST_CHOICE_TWO);
        getByText(TEST_CHOICE_THREE);
    });

    it('should NOT render choices that are locked behind a trait', () => {
        const { getByText, queryByText } = render(<App />);

        getByText(TEST_CHOICE_TWO);
        getByText(TEST_CHOICE_THREE);
        expect(queryByText(TEST_CHOICE_FOUR)).toBeNull();
    });

    it('should render the next section when a choice is clicked.', async () => {
        const { getByText } = render(<App />);

        getByText(TEST_DESCRIPTION_ONE);

        await act(() => {
            getByText(TEST_CHOICE_TWO).click();
        });

        getByText(TEST_DESCRIPTION_TWO);
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

    it('should only render a choice blocked by a prerequisite when we have the corresponding trait.', async () => {
        const { getByText, queryByText } = render(<App />);

        expect(queryByText(TEST_CHOICE_FOUR)).toBeNull();

        await act(() => {
            getByText(TEST_CHOICE_TWO).click();
        });

        getByText(TEST_CHOICE_FOUR);
    });
});
