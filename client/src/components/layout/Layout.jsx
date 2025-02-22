import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div className="d-flex flex-column min-vh-100 justify-content-between">
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="description" content={description} />
                    <meta name="keywords" content={keywords} />
                    <meta name="author" content={author} />
                    <title>{title}</title>
                </Helmet>
                <Header />
                <main>
                    <ToastContainer position="top-center" autoClose={1500} />
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    )
};

export default Layout;
