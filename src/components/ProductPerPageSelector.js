import React from "react";

export const ProductPerPageSelector = ({
    productsPerPage,
    handleProductsPerPageChange,
}) => {
    return (
        <>
            <label htmlFor="productsPerPage" className="mr-2">
                Products per page:
            </label>
            <select
                id="productsPerPage"
                value={productsPerPage}
                onChange={handleProductsPerPageChange}
                className="border rounded px-2 py-1"
            >
                <option value={3}>3</option>
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
            </select>
        </>
    );
};
