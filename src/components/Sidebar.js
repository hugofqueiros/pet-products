import React, { useState } from "react";
import { Close } from "./";

export const Sidebar = ({ submitFilters, isOpen, toggleSidebar }) => {
    const [localFilters, setLocalFilters] = useState({});

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleApplyFilters = (e) => {
        e.preventDefault();
        submitFilters(localFilters);
    };

    return (
        <aside
            className={`w-64 bg-white shadow-lg h-full transform transition duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } fixed inset-y-0 z-20 sm:relative sm:translate-x-0`}
        >
            <div className="flex justify-between items-center px-6 py-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                    className="text-gray-600 focus:outline-none sm:hidden"
                    onClick={toggleSidebar}
                    aria-label={isOpen ? "Close Filters" : "Open Filters"}
                >
                    <Close />
                </button>
            </div>
            <form className="p-6" onSubmit={handleApplyFilters}>
                <div className="mb-4">
                    <label
                        htmlFor="tags_like"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Search by Tag:
                    </label>
                    <input
                        type="text"
                        id="tags_like"
                        name="tags_like"
                        value={localFilters.tags_like || ""}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        aria-label="Search by tag"
                        placeholder="Dog"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="price_lte"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Maximum Price:
                    </label>
                    <input
                        type="number"
                        id="price_lte"
                        name="price_lte"
                        value={localFilters.price_lte || ""}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        aria-label="Maximum price"
                        placeholder="0.00"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="subscription"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Subscription:
                    </label>
                    <select
                        id="subscription"
                        name="subscription"
                        value={localFilters.subscription || ""}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        aria-label="Subscription status"
                    >
                        <option value=""></option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                    Apply Filters
                </button>
            </form>
        </aside>
    );
};
