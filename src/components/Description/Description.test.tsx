import {render} from "@testing-library/react";
import {Description} from "./Description";

describe('Description', () => {
    it('should render the word description', () => {
        const label = 'test_label';
        const { getByText } = render(<Description label={label} />);

        getByText(label);
    });
});
