import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Product } from ".";

describe("Product Component", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    const props = {
        name: "product name",
        price: 20,
        handleAddToCart: jest.fn(),
        id: "id",
        image: "image.png",
    };
    it("should render the Product component", () => {
        const { getByText, getByAltText, getByRole } = render(
            <Product {...props} />
        );

        expect(getByText(/product name/i)).toBeInTheDocument();
        expect(getByText(/20/i)).toBeInTheDocument();
        expect(getByRole("button")).toHaveTextContent(/Add to car/i);
        expect(getByRole("img")).toBeInTheDocument();
        expect(getByRole("img")).toHaveAccessibleName(/image of product name/);
        expect(getByAltText(/image of product name/)).toBeTruthy();
        expect(props.handleAddToCart).not.toHaveBeenCalled();
    });

    it("should display Free when the price of the product is 0", () => {
        const { getByText, queryByText } = render(
            <Product {...props} price={0} />
        );

        expect(getByText(/FREE/i)).toBeInTheDocument();
        expect(queryByText(/0/i)).toBeNull();
    });

    it("should call handleAddToCart when the button is clicked", () => {
        const { getByText } = render(<Product {...props} price={0} />);

        expect(getByText(/FREE/i)).toBeInTheDocument();
        expect(getByText(/product name/i)).toBeInTheDocument();
        expect(props.handleAddToCart).not.toHaveBeenCalled();
        fireEvent.click(getByText("Add to cart"));
        expect(props.handleAddToCart).toHaveBeenCalledTimes(1);
    });
});
