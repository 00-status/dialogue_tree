import {render} from "@testing-library/react";
import {Description} from "./Description";

describe('Description', () => {
    it('should render the word description', () => {
        const { getByText } = render(<Description />);

        getByText('Description');
    });
});
