import * as React from "react";
import { render } from "@testing-library/react";
import { HomePage } from ".";
import { Product } from "../../commonTypes";
import { AppState } from "./index.hook";

const appState: Partial<AppState> = {
    data: null,
    error: null,
    status: "loading",
    credit: 100,
    cart: [],
    creditError: null,
    displaySidebar: false,
    cartTotal: 0,
};

jest.mock("./index.hook.tsx", () => {
    return jest.fn(() => ({
        handleAddToCart: jest.fn(),
        loadData: jest.fn(),
        appState,
        toggleSidebar: jest.fn(),
        removeFromCart: jest.fn(),
        handleBuyNow: jest.fn(),
    }));
});

describe("HomePage Component", () => {
    it("should display the HomePage component when it is loading", () => {
        const { getByText } = render(<HomePage />);
        expect(getByText(/Loading .../i)).toBeInTheDocument();
        expect(getByText(/Credits:/i)).toBeInTheDocument();
    });

    it("should display an error message if there was an error fetching the data", () => {
        appState.status = "failure";

        const { getByText, queryByText } = render(<HomePage />);
        expect(queryByText(/Loading .../i)).toBeNull();
        expect(
            getByText(
                /We are unable to process this request at the moment, please try again later/i
            )
        ).toBeInTheDocument();
        expect(getByText(/Credits:/i)).toBeInTheDocument();
    });

    it("should display the Products if the status is success", () => {
        const products = [
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

        appState.status = "success";
        appState.data = products;

        const { getByText, queryByText } = render(<HomePage />);
        expect(queryByText(/Loading .../i)).toBeNull();
        expect(
            queryByText(
                /We are unable to process this request at the moment, please try again later/i
            )
        ).toBeNull();
        expect(getByText("Product displayName")).toBeInTheDocument();
    });

    it("should display the sidebar if displaySidebar is true", () => {
        appState.status = "success";
        appState.displaySidebar = true;

        const { getByText } = render(<HomePage />);

        expect(
            getByText("You currently do not have any product in your cart")
        ).toBeInTheDocument();
        expect(getByText("Buy now")).toBeInTheDocument();
    });
});
