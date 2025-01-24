import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import { useWishlist } from "../context/wishlist";
import SingleProduct from "./SingleProduct";
const ProductDetails = () => {

    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    // const [imgSrc, setImgSrc] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const [isInWishlist, setIsInWishlist] = useState(false);
    // let isInWishlist = wishlist.some((item) => item._id === product._id);

    useEffect(() => {
        setIsInWishlist(wishlist.includes(product._id));
        //eslint-disable-next-line
    }, [wishlist]);

    const handleWishlistClick = () => {
        if (wishlist.includes(product._id)) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product._id);
        }
    }

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`https://ecommerce-app-server-gks8.onrender.com/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            // setImgSrc(`https://ecommerce-app-server-gks8.onrender.com/api/v1/product/product-photo/${product?._id}`)
            getSimilarProducts(data?.product._id, data?.product.category._id);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`https://ecommerce-app-server-gks8.onrender.com/api/v1/product/similar-products/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params?.slug) {
            getProduct();
            // getSimilarProducts();
        }

        //eslint-disable-next-line
    }, [params]);

    return (
        <div>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img src={`https://ecommerce-app-server-gks8.onrender.com/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} height="300" width={"350px"} />
                </div>
                <div className="col-md-6">
                    <h1 className="text-center">Product Details</h1>
                    <h5>Name: {product.name}</h5>
                    <h5>Description: {product.description}</h5>
                    <h5>Category: {product?.category?.name}</h5>
                    <h5>Price: ${product.price}</h5>
                    <h5>Shipping: {product.shipping ? "Yes" : "No"}</h5>
                    {/* <button className="btn btn-primary ms-1">Buy Now</button> */}
                    <button className="btn btn-secondary ms-1">Add to Cart</button>
                </div>
            </div>
            <hr />
            <div className="row container">
                <h6>similar products</h6>
                {relatedProducts.length === 0 && <p className="text-center">No Similar Products Found</p>}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map((p) => (
                        <SingleProduct key={p._id} product={p} />
                    ))}
                </div>
            </div>
        </div >
    )
};

export default ProductDetails;
