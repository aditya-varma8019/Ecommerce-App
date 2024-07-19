import React from "react";
import UserMenu from "../../components/layout/UserMenu";

const Orders = () => {
    return (
        <div className="container-fluid p-3 m-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <h1>Orders</h1>
                </div>
            </div>
        </div>
    )
};

export default Orders;
