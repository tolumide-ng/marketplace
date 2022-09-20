import * as React from "react";
import styles from "./index.module.css";

type buttonType = "button" | "reset" | "submit";
interface ButtonProps {
    buttonText: string;
    buttonClass: string;
    buttonDisabled?: boolean;
    buttonType: buttonType;
    handleClick?: (_: React.TouchEvent | React.MouseEvent) => void;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref?) => (
        <button
            className={`${styles.button} ${props.buttonClass}`}
            type={props.buttonType ? "button" : "submit"}
            disabled={props.buttonDisabled ?? false}
            onClick={props.handleClick}
            ref={ref}
        >
            {props.buttonText}
        </button>
    )
);
