import React, { useState } from "react";
import { useFetchProducts } from "./hooks/useFetchProducts";
import {
    Sidebar,
    ProductTable,
    Pagination,
    ProductPerPageSelector,
    Hamburger,
} from "./components";

const App = () => {
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(12);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { products, loading, error, totalNumberOfProducts } =
        useFetchProducts(filters, currentPage, productsPerPage);

    const handleSubmitFilters = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page when filters change (button apply filters pressed)
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleProductsPerPageChange = (event) => {
        setProductsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to first page on change of products per page
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="md:min-h-screen container mx-auto mt-8 mb-4 grid grid-cols-1 md:grid-cols-sidebar gap-8">
            <div className="md:hidden flex justify-between items-center mb-4">
                <button
                    className="text-gray-600 hover:text-gray-900 ml-4"
                    onClick={toggleSidebar}
                    aria-expanded={isSidebarOpen}
                    aria-controls="sidebar"
                >
                    <Hamburger />
                </button>
                <div className="flex justify-end mr-4">
                    <ProductPerPageSelector
                        productsPerPage={productsPerPage}
                        handleProductsPerPageChange={
                            handleProductsPerPageChange
                        }
                    />
                </div>
            </div>
            <Sidebar
                submitFilters={handleSubmitFilters}
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <div className="md:col-span-1 flex flex-col">
                <div className="hidden md:flex justify-end mb-4 mr-4">
                    <ProductPerPageSelector
                        productsPerPage={productsPerPage}
                        handleProductsPerPageChange={
                            handleProductsPerPageChange
                        }
                    />
                </div>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : error ? (
                    <div className="text-red-500">Error: {error}</div>
                ) : (
                    <>
                        <ProductTable products={products} />
                        <Pagination
                            productsPerPage={productsPerPage}
                            totalNumberOfProducts={totalNumberOfProducts}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
