import {render} from "@testing-library/react";
import {App} from "./App";

describe('App', () => {
    it('should display the main header', () => {
        const { getByText } = render(<App />);

        getByText('Dialogue Tree');
    });
});
