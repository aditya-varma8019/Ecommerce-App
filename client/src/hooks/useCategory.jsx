import { useState, useEffect } from "react";
import axios from "axios";

const backEndUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND : "http://localhost:5000";

export default function useCategory() {
    const [allCategories, setAllCategories] = useState([]);

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${backEndUrl}/api/v1/category/get-category`);
            setAllCategories(data?.categories);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    return allCategories;
}