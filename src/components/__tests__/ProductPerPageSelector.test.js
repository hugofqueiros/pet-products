import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductPerPageSelector } from "../";

describe("ProductPerPageSelector component", () => {
    const setup = (props = {}) => {
        const defaultProps = {
            productsPerPage: 12,
            handleProductsPerPageChange: jest.fn(),
        };
        return render(<ProductPerPageSelector {...defaultProps} {...props} />);
    };

    test("should render", () => {
        setup();
        expect(
            screen.getByLabelText(/Products per page:/i)
        ).toBeInTheDocument();
    });

    test("should display the correct initial value", () => {
        setup();
        expect(screen.getByDisplayValue("12")).toBeInTheDocument();
    });

    test("should call handleProductsPerPageChange with the correct value when changed", () => {
        const handleProductsPerPageChange = jest.fn();
        setup({ handleProductsPerPageChange });
        const select = screen.getByLabelText(/Products per page:/i);

        fireEvent.change(select, { target: { value: "6" } });
        expect(handleProductsPerPageChange).toHaveBeenCalledWith(
            expect.any(Object)
        ); // Check if called with an event object
        expect(handleProductsPerPageChange).toHaveBeenCalledTimes(1);
    });

    test("should render all options", () => {
        setup();
        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(4);
        expect(options[0]).toHaveTextContent("3");
        expect(options[1]).toHaveTextContent("6");
        expect(options[2]).toHaveTextContent("12");
        expect(options[3]).toHaveTextContent("24");
    });

    test("should select the correct option based on productsPerPage prop", () => {
        setup({ productsPerPage: 6 });
        expect(screen.getByDisplayValue("6")).toBeInTheDocument();
    });
});
