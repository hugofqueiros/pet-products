import React from "react";

const TABLE_TITLES = [
    "ID",
    "Image",
    "Title",
    "Tags",
    "Price (£)",
    "Subscription / (Discount in £)",
];

export const ProductTable = ({ products }) => {
    const handleRowClick = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        {TABLE_TITLES.map((title, index) => (
                            <th
                                key={`${title}-${index}`}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr
                            key={product.id}
                            className={`${
                                index % 2 === 0 ? "bg-gray-100" : ""
                            } cursor-pointer`}
                            onClick={() => handleRowClick(product.url)}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {product.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <img
                                    src={product.image_src}
                                    alt={product.title}
                                    loading="lazy"
                                    className="h-12 w-12"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {product.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {product.tags.join(", ")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {product.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {product.subscription
                                    ? `Yes - ${product.subscription_discount}`
                                    : "No"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
