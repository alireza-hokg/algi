import { useState } from "react"
import { post } from "../services/api.js";

export const useVariants = () => {
    const [variant, setVariant] = useState({
        product_id: "",
        size: "",
        quantity: "",
        width: "",
        height: "",
        waist: "",
    });

    const onChangeVariant = e => {
        let { target } = e
        setVariant(prev => ({
            ...prev,
            [target.name]: target.value
        }))
    }

    const handleCreateVariant = async (variant, product_id) => {
        const data = {
            ...variant,
            product_id
        }
        try {
            const result = await post('/variants', data);
            console.log(result)
        }
        catch(err) {
            console.log(err.message)
        }
    }

    return {
        variant,
        setVariant,
        onChangeVariant,
        handleCreateVariant
    }
}