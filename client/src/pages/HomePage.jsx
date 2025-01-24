import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, Radio } from 'antd'
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { useWishlist } from "../context/wishlist";
// import "../styles/HomePage.css";
// import { Button } from "@material-tailwind/react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SingleProduct from "./SingleProduct";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);




    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`https://ecommerce-app-server-gks8.onrender.com/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`https://ecommerce-app-server-gks8.onrender.com/api/v1/category/get-category`);
            setCategories(data.categories);
        } catch (error) {
            console.log(error);
        }
    };

    const getTotalCount = async () => {
        try {
            const { data } = await axios.get(`https://ecommerce-app-server-gks8.onrender.com/api/v1/product/product-count`);
            setTotalCount(data?.totalCount);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore();

        //eslint-disable-next-line
    }, [page])

    // load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`https://ecommerce-app-server-gks8.onrender.com/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategories();
        getTotalCount();
    }, [])


    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        }
        else {
            all = all.filter((c) => c !== id)
        }
        setChecked(all);
    }
    useEffect(() => {
        if (!checked.length && !radio.length)
            getAllProducts();

        //eslint-disable-next-line
    }, [checked, radio]);

    useEffect(() => {
        if (checked.length || radio.length) filterProducts();

        //eslint-disable-next-line
    }, [checked, radio]);
    //get filtered products
    const filterProducts = async () => {
        try {
            const { data } = await axios.post(`https://ecommerce-app-server-gks8.onrender.com/api/v1/product/product-filters`, { checked, radio });
            // console.log(data);
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };




    return (
        <div className="home-page">
            <div className="row mt-3">
                <div className="col-md-2 ms-3">
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>

                    {/* price filter */}
                    <h4 className="text-center mt-4">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column">
                        <button className="btn btn-danger" onClick={() => window.location.reload()} >Clear Filter</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <SingleProduct key={p._id} product={p} />
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < totalCount && (
                            <button className="btn btn-secondary" onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1);
                            }}>
                                {loading ? "Loading..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>
            </div >
        </div >
    );
};

export default HomePage;
