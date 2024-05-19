import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { useFetchProducts } from "./hooks/useFetchProducts";
import data from "../data/products.json";

jest.mock("./hooks/useFetchProducts");

const mockProducts = data.products;

const mockFetchProducts = {
    products: mockProducts,
    loading: false,
    error: null,
    totalNumberOfProducts: 12,
};

describe("App component", () => {
    beforeEach(() => {
        useFetchProducts.mockReturnValue(mockFetchProducts);
    });

    test("should render", () => {
        render(<App />);
        expect(screen.getByText(/Apply Filters/i)).toBeInTheDocument();
    });

    test("should toggle the sidebar on mobile view", () => {
        render(<App />);
        const toggleButton = screen.getByRole("button", {
            name: /open filters/i,
        });
        fireEvent.click(toggleButton);
        expect(
            screen.getByRole("button", { name: /close filters/i })
        ).toBeInTheDocument();
    });

    test("should change the number of products per page", () => {
        render(<App />);
        const selectElement = screen.getAllByLabelText(/Products per page/i)[0];
        fireEvent.change(selectElement, { target: { value: "24" } });
        expect(selectElement.value).toBe("24");
    });

    test("should display loading state", () => {
        useFetchProducts.mockReturnValueOnce({
            ...mockFetchProducts,
            loading: true,
        });
        render(<App />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test("should display error state", () => {
        useFetchProducts.mockReturnValueOnce({
            ...mockFetchProducts,
            error: "Failed to fetch products",
        });
        render(<App />);
        expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    test("should apply filters when the button is clicked", async () => {
        render(<App />);
        const inputElement = screen.getByLabelText(/Search by Tag:/i);
        fireEvent.change(inputElement, { target: { value: "Dog" } });

        const applyButton = screen.getByRole("button", {
            name: /apply filters/i,
        });
        fireEvent.click(applyButton);

        await waitFor(() => {
            expect(useFetchProducts).toHaveBeenCalledWith(
                { tags_like: "Dog" },
                1,
                12
            );
        });
    });

    test("should render the product table with fetched products", () => {
        render(<App />);
        expect(screen.getByText(/Joint Care Chews/i)).toBeInTheDocument();
        expect(screen.getByText(/Calming Chews/i)).toBeInTheDocument();
    });
});
