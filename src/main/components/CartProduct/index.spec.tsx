import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { CartProduct } from ".";

describe("CartProduct Component", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    const props = {
        name: "cart product name",
        count: 2,
        cost: 220,
        id: "id",
        handleRemove: jest.fn(),
    };

    it("should render the component", () => {
        render(<CartProduct {...props} />);

        expect(
            screen.getByRole("button", {
                name: /Remove/i,
            })
        ).toBeInTheDocument();

        expect(screen.getByText(props.name)).toBeInTheDocument();
        expect(screen.getByText(props.cost)).toBeInTheDocument();
    });

    it("should call handleRemove function when the button is clicked", () => {
        const { getByText } = render(<CartProduct {...props} />);

        const element = getByText("Remove");
        expect(element).toBeTruthy();
        fireEvent.click(element);
        expect(props.handleRemove).toHaveBeenCalledTimes(1);
    });
});
