import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {

    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const navigate = useNavigate();

    const removeCartItem = (pid) => {
        try {
            let temp = [...cart];
            let index = temp.findIndex((item) => item._id === pid);
            temp.splice(index, 1);
            setCart(temp);
            localStorage.setItem("cart", JSON.stringify(temp));
        } catch (error) {
            console.log(error);

        }
    }

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((p) => {
                total = total + p.price
            });

            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length > 0 ? `You have ${cart?.length} items in cart ${auth?.token ? "" : " Please Login to checkout"}` : "Your Cart is empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            {cart?.map((p) => (
                                <div className="row mb-2 p-3 card flex-row">
                                    <div className="col-md-4">
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            width={"100px"}
                                            height={"100px"}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price: ${p.price}</p>
                                        <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total: {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Shipping Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className="btn btn-outline-warning" onClick={() => {
                                        navigate("/dashboard/user/profile")
                                    }}>Another Address</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="mb-3">
                                    {auth?.token ? (
                                        <>
                                            <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-outline-warning" onClick={() => navigate("/login", { state: "/cart" })}>Login to Checkout</button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};

export default CartPage;
