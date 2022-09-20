import * as React from "react";
import { Product } from "../../commonTypes";
import { withCurrency } from "../../utilities/helpers/withCurrency";
import { Button } from "../Button";
import { CartProduct } from "../CartProduct";
import styles from "./index.module.css";

interface Props {
    total: number;
    handleClick: (_: number) => void;
    cart: ReadonlyArray<Product>;
    creditError: string | null;
    handleClose: () => void;
    handleRemove: (id: string) => void;
}

interface ProductCount {
    count: number;
    product: Product;
}

export const SideBar: React.FC<Props> = ({
    total,
    handleClick,
    handleClose,
    cart,
    handleRemove,
    creditError,
}) => {
    const modifiedCart: Record<string, ProductCount> = {};

    cart.forEach((item) => {
        if (modifiedCart[item.id]) {
            const value = modifiedCart[item.id];
            modifiedCart[item.id] = {
                ...value,
                count: value.count + 1,
            };
        } else {
            modifiedCart[item.id] = { product: item, count: 1 };
        }
    });

    return (
        <aside className={styles.side}>
            <div className={styles.sideTop}>
                <p className={styles.sideTitle}>Cart</p>
                <Button
                    buttonClass={styles.sideClose}
                    buttonText="Close"
                    buttonType="button"
                    handleClick={handleClose}
                />
            </div>
            <div className={styles.sideMid}>
                {cart.length ? (
                    Object.keys(modifiedCart).map((id) => (
                        <CartProduct
                            key={id}
                            id={id}
                            name={modifiedCart[id].product.displayName}
                            cost={
                                modifiedCart[id].product.metadata
                                    .blockPricingStrategy.credits
                            }
                            count={modifiedCart[id].count}
                            handleRemove={handleRemove}
                        />
                    ))
                ) : (
                    <p className={styles.sideEmpty}>
                        You currently do not have any product in your cart
                    </p>
                )}
            </div>
            <div className={styles.sideBottom}>
                <div className={styles.sideError}>{creditError}</div>
                <div className={styles.sideDetail}>
                    <p className={styles.sideTotal}>Total:</p>
                    <p className={styles.sideValue}>{withCurrency(total)}</p>
                </div>

                <Button
                    buttonClass={styles.sideBuy}
                    buttonType="button"
                    buttonText="Buy now"
                    handleClick={() => handleClick(total)}
                    buttonDisabled={cart.length === 0}
                />
            </div>
        </aside>
    );
};
