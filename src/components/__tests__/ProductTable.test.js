import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductTable } from "../";
import data from "../../../data/products.json";

const mockProducts = data.products;

describe("ProductTable component", () => {
    test("should render table headers correctly", () => {
        render(<ProductTable products={[]} />);
        expect(
            screen.getByRole("columnheader", { name: "ID" })
        ).toBeInTheDocument();
    });

    test("should renders product rows correctly", () => {
        render(<ProductTable products={mockProducts} />);

        expect(screen.getByText(10)).toBeInTheDocument();
        expect(screen.getByText("Joint Care Chews")).toBeInTheDocument();
        expect(screen.getByText(29.95)).toBeInTheDocument();
    });

    test("should open the correct URL when a row is clicked", () => {
        global.open = jest.fn();
        render(<ProductTable products={mockProducts} />);
        fireEvent.click(screen.getByText("Joint Care Chews"));
        expect(global.open).toHaveBeenCalledWith(
            "https://thepetlabco.com/products/joint-chews-for-dogs",
            "_blank"
        );
        fireEvent.click(screen.getByText("Calming Chews"));
        expect(global.open).toHaveBeenCalledWith(
            "https://www.thepetlabco.com/products/calming-chews",
            "_blank"
        );
    });
});
