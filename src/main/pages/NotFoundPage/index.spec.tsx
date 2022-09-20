import * as React from "react";
import { render } from "@testing-library/react";
import { NotFoundPage } from ".";

describe("NotFoundPage Component", () => {
    it("should display the NotFound page component", () => {
        const { getByText } = render(<NotFoundPage />);

        expect(getByText("404")).toBeInTheDocument();
        expect(getByText("Page not found")).toBeInTheDocument();
    });
});
