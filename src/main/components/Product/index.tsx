import * as React from "react";
import { withCurrency } from "../../utilities/helpers/withCurrency";
import { Button } from "../Button";
import styles from "./index.module.css";

interface Props {
    name: string;
    price: number;
    handleAddToCart: (id: string) => void;
    id: string;
    image: string;
}

export const Product: React.FC<Props> = ({
    name,
    price,
    handleAddToCart,
    id,
    image,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.productTop}>
                <p className={styles.productName}>{name}</p>

                <img
                    src={image}
                    alt={`image of ${name}`}
                    className={styles.productImage}
                />
            </div>

            <div className={styles.productBottom}>
                <p className={styles.productPrice}>
                    {price ? withCurrency(price) : "Free"}
                </p>
                <Button
                    buttonType="button"
                    buttonClass={styles.productButton}
                    buttonText="Add to cart"
                    handleClick={() => handleAddToCart(id)}
                />
            </div>
        </div>
    );
};
