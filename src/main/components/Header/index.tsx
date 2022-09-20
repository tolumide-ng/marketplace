import * as React from "react";
import { withCurrency } from "../../utilities/helpers/withCurrency";
import { Button } from "../Button";
import styles from "./index.module.css";

interface Props {
    credit: number;
    count: number;
    viewCart: () => void;
    displaySidebar: boolean;
}

export const Header: React.FC<Props> = ({
    credit,
    count,
    viewCart,
    displaySidebar,
}) => {
    return (
        <section className={styles.header}>
            <div className={styles.headerRight}>
                <p className={styles.headerCredit}>
                    Credits:
                    <span className={styles.headerPrice}>
                        {withCurrency(credit)}
                    </span>
                </p>

                <p className={styles.headerCount}>
                    {count}
                    <span className={styles.headCountTitle}>item(s)</span>
                </p>

                {displaySidebar ? null : (
                    <Button
                        buttonClass={styles.headerButton}
                        buttonText={"View Cart"}
                        buttonType="button"
                        handleClick={viewCart}
                    />
                )}
            </div>
        </section>
    );
};
