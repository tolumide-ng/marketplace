import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Button } from ".";

describe("Button Component", () => {
    it("should display the text button component", () => {
        const buttonText = "Click me";
        const { getByText } = render(
            <Button
                buttonText={buttonText}
                buttonClass=""
                buttonType="button"
            />
        );

        expect(
            screen.getByRole("button", {
                name: /Click me/i,
            })
        ).toBeInTheDocument();
        expect(getByText(buttonText).closest("button")).toBeInTheDocument();
    });

    it("should calll the handleClick method", () => {
        const handleClick = jest.fn();

        const buttonText = "Click me";
        const { getByText } = render(
            <Button
                buttonText={buttonText}
                buttonClass=""
                buttonType="button"
                handleClick={handleClick}
            />
        );

        fireEvent.click(getByText(buttonText));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
