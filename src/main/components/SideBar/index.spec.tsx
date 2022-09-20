import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SideBar } from ".";
import { Product } from "../../commonTypes";

describe("SideBar Component", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    const props = {
        total: 230,
        handleClick: jest.fn(),
        handleClose: jest.fn(),
        cart: [],
        creditError: null,
        handleRemove: jest.fn(),
    };

    it("should render the Sidebar component", () => {
        const { getByText, getByRole, queryByRole } = render(
            <SideBar {...props} />
        );

        expect(props.handleClick).not.toHaveBeenCalled();
        expect(props.handleClose).not.toHaveBeenCalled();
        expect(props.handleRemove).not.toHaveBeenCalled();

        expect(getByRole("button", { name: /Close/i })).toBeInTheDocument();
        expect(getByRole("button", { name: /Buy now/i })).toBeInTheDocument();
        expect(
            getByRole("button", { name: /Buy now/i }).getAttribute("disabled")
        ).toBe("");
        expect(queryByRole("button", { name: /Remove/i })).toBeNull();
        expect(getByText(/Cart/)).toBeInTheDocument();
        expect(getByText(/Total/)).toBeInTheDocument();
        expect(getByText(/230/)).toBeInTheDocument();
        expect(
            getByText("You currently do not have any product in your cart")
        ).toBeInTheDocument();
    });

    it("should render the CartProduct on the Sidebar Component", () => {
        const cart = [
            {
                id: "id",
                displayName: "Product displayName",
                metadata: {
                    blockPricingStrategy: {
                        credits: 20,
                    },
                },
            } as unknown as Product,
        ];

        const { getByText, queryByText, getByRole } = render(
            <SideBar {...props} cart={cart} />
        );

        expect(props.handleClick).not.toHaveBeenCalled();
        expect(props.handleClose).not.toHaveBeenCalled();
        expect(props.handleRemove).not.toHaveBeenCalled();

        expect(
            getByRole("button", { name: /Buy now/i }).getAttribute("disabled")
        ).toBe(null);
        expect(getByText(/Product displayName/)).toBeInTheDocument();
        expect(
            queryByText("You currently do not have any product in your cart")
        ).toBeNull();
    });

    it("should display a creditError when it is provided", () => {
        const { getByText } = render(
            <SideBar {...props} creditError={"Not Enough credit"} />
        );

        expect(getByText("Not Enough credit")).toBeInTheDocument();
    });

    it("should disable the Buy now button if the cost of the items in the cart is more than the credit", () => {
        const cart = [
            {
                id: "id",
                displayName: "Product displayName",
                metadata: {
                    blockPricingStrategy: {
                        credits: 250,
                    },
                },
            } as unknown as Product,
        ];

        const { getByRole } = render(<SideBar {...props} cart={cart} />);

        expect(
            getByRole("button", { name: /Buy now/i }).getAttribute("disabled")
        ).toBe(null);
    });

    it("should call the handleClick function when a user clicks 'Buy now'", () => {
        const cart = [
            {
                id: "id",
                displayName: "Product displayName",
                metadata: {
                    blockPricingStrategy: {
                        credits: 20,
                    },
                },
            } as unknown as Product,
        ];

        const { getByText } = render(<SideBar {...props} cart={cart} />);

        expect(props.handleClick).not.toHaveBeenCalled();
        fireEvent.click(getByText("Buy now"));
        expect(props.handleClick).toHaveBeenCalledTimes(1);
    });

    it("should call the handleRemove function when a user clicks the remove button on a cart item", () => {
        const cart = [
            {
                id: "id",
                displayName: "Product displayName",
                metadata: {
                    blockPricingStrategy: {
                        credits: 20,
                    },
                },
            } as unknown as Product,
        ];

        const { getByText } = render(<SideBar {...props} cart={cart} />);
        expect(props.handleRemove).not.toHaveBeenCalled();
        fireEvent.click(getByText("Remove"));
        expect(props.handleClick).toHaveBeenCalledTimes(1);
    });

    it("should call the handleClose function when a user clocks on the close button", () => {
        const { getByText } = render(<SideBar {...props} />);

        expect(props.handleClose).not.toHaveBeenCalled();
        fireEvent.click(getByText("Close"));
        expect(props.handleClose).toHaveBeenCalledTimes(1);
    });
});
