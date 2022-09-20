import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Header } from ".";

describe("Header Component", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    const props = {
        credit: 200,
        count: 4,
        viewCart: jest.fn(),
        displaySidebar: false,
    };

    it("should render the header component and display View Cart button", () => {
        const { getByText } = render(<Header {...props} />);

        expect(getByText("View Cart")).toBeInTheDocument();
        expect(getByText(props.credit, { exact: false })).toBeInTheDocument();
        expect(getByText(props.count, { exact: false })).toBeTruthy();
        expect(props.viewCart).not.toHaveBeenCalled();
    });

    it("should render the header component but should not display View Cart button", () => {
        const { getByText, queryByText } = render(
            <Header {...props} displaySidebar={true} />
        );

        expect(queryByText("View Cart")).toBeNull();
        expect(getByText(props.count, { exact: false })).toBeTruthy();
        expect(props.viewCart).not.toHaveBeenCalled();
    });

    it("should call the viewCart handler when the button is clicked", () => {
        const { getByText } = render(<Header {...props} />);

        expect(props.viewCart).not.toHaveBeenCalled();

        const element = getByText("View Cart");
        fireEvent.click(element);
        expect(props.viewCart).toHaveBeenCalledTimes(1);
    });
});
