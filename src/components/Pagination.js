import React, { useMemo } from "react";

export const Pagination = ({
    productsPerPage,
    totalNumberOfProducts,
    paginate,
    currentPage,
}) => {
    // useMemo hook: use to memoize the calculation of page numbers if productsPerPage and totalNumberOfProducts don"t change. Prevents recalculating the page number.
    const pageNumbers = useMemo(() => {
        const totalPages = Math.ceil(totalNumberOfProducts / productsPerPage);
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }, [productsPerPage, totalNumberOfProducts]);

    return (
        <nav aria-label="Product Pagination" className="mt-4">
            <ul
                className="flex justify-center space-x-2"
                role="menubar"
                aria-label="pagination"
            >
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item" role="none">
                        <button
                            onClick={() => paginate(number)}
                            className={`px-3 py-1 border rounded hover:bg-gray-200 focus:outline-none focus:ring ${
                                currentPage === number ? "bg-gray-200" : ""
                            }`}
                            role="menuitem"
                            aria-label={`Go to page ${number}`}
                            aria-current={
                                currentPage === number
                                    ? "current page"
                                    : undefined
                            }
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
