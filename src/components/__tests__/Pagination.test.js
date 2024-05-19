import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../";

describe("Pagination component", () => {
    const setup = (props = {}) => {
        const defaultProps = {
            productsPerPage: 6,
            totalNumberOfProducts: 12,
            paginate: jest.fn(),
            currentPage: 1,
        };
        return render(<Pagination {...defaultProps} {...props} />);
    };

    test("should render", () => {
        setup();
        expect(
            screen.getByLabelText(/Product Pagination/i)
        ).toBeInTheDocument();
    });

    test("should display the correct number of page buttons", () => {
        setup();
        const pageButtons = screen.getAllByRole("menuitem");
        expect(pageButtons).toHaveLength(2);
    });

    test("should display the correct page numbers", () => {
        setup();
        const pageButtons = screen.getAllByRole("menuitem");
        pageButtons.forEach((button, index) => {
            expect(button).toHaveTextContent((index + 1).toString());
        });
    });

    test("should highlight the current page", () => {
        const currentPage = 2;
        setup({ currentPage });
        const currentButton = screen.getByLabelText(
            `Go to page ${currentPage}`
        );
        expect(currentButton).toHaveClass("bg-gray-200");
        expect(currentButton).toHaveAttribute("aria-current", "current page");
    });

    test("should call paginate function with the correct page number when clicked", () => {
        const paginate = jest.fn();
        setup({ paginate });
        const pageButtons = screen.getAllByRole("menuitem");
        fireEvent.click(pageButtons[1]);
        expect(paginate).toHaveBeenCalledWith(2);
    });
});
