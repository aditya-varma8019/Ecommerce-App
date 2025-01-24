import React from "react";
import { useWishlist } from "../context/wishlist";

const Wishlist = () => {

    const { wishlist } = useWishlist();
    // console.log(wishlist);


    return (
        <div>
            <h1>Your Wishlist</h1>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                wishlist.map((product) => (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </div>
                ))
            )}
        </div>
    )
};

export default Wishlist;
