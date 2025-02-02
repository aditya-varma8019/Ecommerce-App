import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";

const backEndUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND : "http://localhost:5000";

const WishlistContext = createContext(); // Fixed typo

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [auth] = useAuth();

    const fetchWishlist = async () => {
        if (!auth?.token) return; // Check if token exists
        try {
            const { data } = await axios.get(`${backEndUrl}/api/v1/auth/wishlist`, {
                headers: {
                    Authorization: `${auth?.token}` // Add "Bearer" prefix
                }
            });
            // console.log(data);
            // console.log("hello");

            setWishlist(data.wishlist);
        } catch (error) {
            console.log(auth.user);

            console.error("Error while fetching wishlist", error);
        }
    };

    const addToWishlist = async (productId) => {
        try {
            // Optimistically update the UI
            setWishlist((prev) => [...prev, productId]);
            await axios.post(`${backEndUrl}/api/v1/auth/wishlist/add`, { productId }, {
                headers: {
                    Authorization: `${auth?.token}`
                }
            });
            // Fetch the updated wishlist
            fetchWishlist();
        } catch (error) {
            console.error("Error while adding to wishlist", error);
            // Revert the UI update if the API call fails
            setWishlist((prev) => prev.filter((id) => id !== productId));
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            // Optimistically update the UI
            setWishlist((prev) => prev.filter((id) => id !== productId));
            await axios.post(`${backEndUrl}/api/v1/auth/wishlist/remove`, { productId }, {
                headers: {
                    Authorization: `${auth?.token}`
                }
            });
            // Fetch the updated wishlist
            fetchWishlist();
        } catch (error) {
            console.error("Error while removing from wishlist", error);
            // Revert the UI update if the API call fails
            setWishlist((prev) => [...prev, productId]);
        }
    };

    useEffect(() => {
        if (auth?.token) {
            fetchWishlist();
        }
    }, [auth?.token]); // Add auth?.token as a dependency

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);