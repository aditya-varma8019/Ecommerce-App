import React from "react";
import { useAuth } from "../context/auth";
const HomePage = () => {
    const [auth] = useAuth();
    return (
        <div>
            HomePage
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </div>
    );
};

export default HomePage;
