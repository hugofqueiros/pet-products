import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "../";

describe("Sidebar component", () => {
    const setup = (props = {}) => {
        const defaultProps = {
            submitFilters: jest.fn(),
            isOpen: true,
            toggleSidebar: jest.fn(),
        };
        return render(<Sidebar {...defaultProps} {...props} />);
    };

    test("should render", () => {
        setup();
        expect(screen.getByText(/Apply Filters/i)).toBeInTheDocument();
    });

    test("should call toggleSidebar when close button is clicked", () => {
        const toggleSidebar = jest.fn();
        setup({ toggleSidebar });
        fireEvent.click(screen.getByLabelText(/Close Filters/i));
        expect(toggleSidebar).toHaveBeenCalled();
    });

    test("should update local filters on input change", () => {
        setup();
        const tagsInput = screen.getByLabelText(/Search by Tag:/i);
        fireEvent.change(tagsInput, { target: { value: "new tag" } });
        expect(tagsInput).toHaveValue("new tag");
    });

    test("should call submitFilters with local filters when Apply Filters button is clicked", () => {
        const submitFilters = jest.fn();
        setup({ submitFilters });
        const tagsInput = screen.getByLabelText(/Search by Tag:/i);
        const priceInput = screen.getByLabelText(/Maximum Price:/i);
        const subscriptionSelect = screen.getByLabelText(/Subscription:/i);
        fireEvent.change(tagsInput, { target: { value: "Dog" } });
        fireEvent.change(priceInput, { target: { value: "30" } });
        fireEvent.change(subscriptionSelect, { target: { value: "true" } });
        fireEvent.click(screen.getByText(/Apply Filters/i));
        expect(submitFilters).toHaveBeenCalledWith({
            tags_like: "Dog",
            price_lte: "30",
            subscription: "true",
        });
    });
});
