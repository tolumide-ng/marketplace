import * as React from "react";
import { Data, Product, Status } from "../../commonTypes";
import { fetchCall } from "../../utilities/helpers/fetchCall";

export interface AppState {
    data: ReadonlyArray<Product> | null;
    error: string | null;
    status: Status;
    credit: number;
    cart: Array<Product>;
    creditError: string | null;
    displaySidebar: boolean;
    cartTotal: number;
}

const STARTING_CREDIT = 10000;

export default function useHome() {
    const [appState, setAppState] = React.useState<AppState>({
        data: null,
        error: null,
        status: "rest",
        credit: STARTING_CREDIT,
        cart: [],
        creditError: null,
        displaySidebar: false,
        cartTotal: 0,
    });

    const findProduct = (id: string) =>
        appState.data?.find((product) => product.id === id);

    const handleAddToCart = (id: string) => {
        const product = findProduct(id)!;
        const cost = product.metadata.blockPricingStrategy.credits;
        setAppState((state) => ({
            ...state,
            cart: [...state.cart, product],
            creditError: null,
            cartTotal: state.cartTotal + cost,
        }));
    };

    const toggleSidebar = () => {
        setAppState((state) => ({
            ...state,
            displaySidebar: !state.displaySidebar,
        }));
    };

    const removeFromCart = (id: string) => {
        const product = findProduct(id)!;
        const cost = product.metadata.blockPricingStrategy.credits;

        const cart = [...appState.cart];
        const indexInCart = cart.findIndex((product) => product.id === id);
        cart.splice(indexInCart, 1);
        setAppState((state) => ({
            ...state,
            cart,
            creditError: null,
            cartTotal: state.cartTotal - cost,
        }));
    };

    const loadData = async () => {
        try {
            setAppState((state) => ({ ...state, status: "loading" }));
            const { data } = (await fetchCall({
                path: "/blocks",
                method: "GET",
                payload: null,
                contentType: "application/json",
            })) as unknown as Data;

            const simpleData: Array<Product> = data.filter((data) => {
                if (data.metadata.blockPricingStrategy.name === "simple") {
                    return data;
                }
            });

            setAppState((state) => ({
                ...state,
                status: "success",
                data: simpleData,
            }));
        } catch (error) {
            const { message } = error as Error;
            setAppState((state) => ({
                ...state,
                status: "failure",
                error: message,
                data: null,
            }));
        }
    };

    const handleBuyNow = () => {
        if (appState.cartTotal >= appState.credit) {
            setAppState((state) => ({
                ...state,
                creditError:
                    "You do not have enough credit to add this product to your cart, you can remove some items to add this one",
            }));
        } else {
            setAppState((state) => ({
                ...state,
                error: null,
                cart: [],
                cartTotal: 0,
                credit: state.credit - state.cartTotal,
                displaySidebar: false,
                creditError: null,
            }));
        }
    };

    return {
        handleAddToCart,
        loadData,
        appState,
        removeFromCart,
        toggleSidebar,
        handleBuyNow,
    };
}
