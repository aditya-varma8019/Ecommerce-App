import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { useWishlist } from "../context/wishlist";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SingleProduct = ({ product }) => {
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const [isWishlistLoading, setIsWishlistLoading] = useState(false);
    const [buttonText, setButtonText] = useState("");

    const isInWishlist = wishlist.some(
        (item) => item?._id?.toString() === product?._id?.toString()
    );

    useEffect(() => {
        if (isInWishlist) {
            setButtonText("Remove from Wishlist");
        } else {
            setButtonText("Add to Wishlist");
        }

        //eslint-disable-next-line
    }, [])

    const handleWishlistClick = async () => {
        if (!product) return;
        setIsWishlistLoading(true);
        const productId = product._id.toString();
        try {
            if (isInWishlist) {
                await removeFromWishlist(productId);
                setButtonText("Add to Wishlist");
            } else {
                await addToWishlist(productId);
                setButtonText("Remove from Wishlist");
            }
        } catch (error) {
            console.error("Wishlist update failed:", error);
        } finally {
            setIsWishlistLoading(false);
        }
    };

    if (!product) return null;

    return (
        <div className="card m-2" style={{ width: "18rem" }}>
            <img
                src={`https://ecommerce-app-server-gks8.onrender.com/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
            />
            <div className="card-body">
                <h5 className="card-name-price">{product.name}</h5>
                <p className="card-title">
                    {product.description.length > 30
                        ? product.description.substring(0, 30) + "..."
                        : product.description}
                </p>
                <p className="card-price card-title">${product.price}</p>
                <div className="flex flex-grow-1 justify-content-between h-40">
                    <button
                        className="btn btn-primary mx-1"
                        onClick={() => navigate(`/product/${product.slug}`)}
                    >
                        More Details
                    </button>
                    <button
                        className="btn btn-warning mx-1"
                        onClick={() => {
                            setCart((prevCart) => {
                                const updatedCart = [...prevCart, product];
                                localStorage.setItem("cart", JSON.stringify(updatedCart));
                                return updatedCart;
                            });
                            toast.success("Item Added to Cart");
                        }}
                    >
                        Add To Cart
                    </button>
                    <button
                        onClick={handleWishlistClick}
                        className="btn btn-outline-success mx-1"
                        disabled={isWishlistLoading}
                    >
                        {isWishlistLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
