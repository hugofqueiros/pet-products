import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook to make requests to the server everytime the user chooses to apply the selected filters
 *
 * @param {*} filters
 * @param {*} currentPage
 * @param {*} productsPerPage
 * @returns
 */
export const useFetchProducts = (filters, currentPage, productsPerPage) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalNumberOfProducts, setTotalNumberOfProducts] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            if (filters.subscription === "") {
                delete filters.subscription;
            }

            if (filters.price_lte === "") {
                delete filters.price_lte;
            }

            try {
                const response = await axios.get(
                    "http://localhost:3010/products",
                    {
                        params: {
                            ...filters,
                            _page: currentPage,
                            _limit: productsPerPage,
                        },
                    }
                );
                setProducts(response.data);
                setTotalNumberOfProducts(
                    parseInt(response.headers["x-total-count"], 10)
                );
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters, currentPage, productsPerPage]);

    return { products, loading, error, totalNumberOfProducts };
};
