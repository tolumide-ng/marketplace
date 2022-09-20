import * as React from "react";
import { Button } from "../Button";
import styles from "./index.module.css";

interface Props {
    name: string;
    count: number;
    cost: number;
    id: string;
    handleRemove: (_: string) => void;
}

export const CartProduct: React.FC<Props> = ({
    name,
    count,
    cost,
    id,
    handleRemove,
}) => {
    return (
        <div className={styles.product}>
            <div className={styles.productTop}>
                <p className={styles.productName}>{name}</p>
                <Button
                    buttonType="button"
                    buttonClass={styles.productRemove}
                    buttonText="Remove"
                    handleClick={() => handleRemove(id)}
                />
            </div>
            <div className={styles.productBottom}>
                <p className={styles.productCost}>{cost ? cost : "FREE"}</p>
                <p className={styles.productCount}>x({count})</p>
            </div>
        </div>
    );
};
