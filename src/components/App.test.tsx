import {act, render} from "@testing-library/react";
import {App} from "./App";

const TEST_CHOICE_ONE = 'Leads to choice 1';
const TEST_DESCRIPTION_ONE = 'Test Description One!';
const TEST_CHOICE_TWO = 'Leads to choice 2';
const TEST_DESCRIPTION_TWO = 'Test Description Two!';

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
                description: TEST_DESCRIPTION_TWO
            }
        ]
    };
});

describe('App', () => {
    it('should display the main header', () => {
        const { getByText } = render(<App />);

        getByText('Dialogue Tree');
    });

    it('should display a dialogue description', () => {
        const { getByText } = render(<App />);

        getByText(TEST_DESCRIPTION_ONE);
    });

    it('should render several buttons', () => {
        const { getByText } = render(<App />);

        getByText(TEST_CHOICE_TWO);
    });

    it('should render the next section when a choice is clicked.', async () => {
        const { getByText } = render(<App />);

        getByText(TEST_DESCRIPTION_ONE);

        await act(() => {
            const choice = getByText(TEST_CHOICE_TWO).click();
        });

        getByText(TEST_DESCRIPTION_TWO);
    });
});
