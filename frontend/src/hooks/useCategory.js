import { useEffect } from "react";
import { get } from "../services/api";
import { useState } from "react";

export const useCategory = () => {
    const [categories, setCategories] = useState([]);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const { data: categoriesData } = await get("/categories");
                setCategories(categoriesData);
            }
            catch(err) {
                console.log(err.message)
            }
        }
        fetchData()
    }, [])
    return {
        categories
    }
}