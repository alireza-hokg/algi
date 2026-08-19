import { toast } from "react-hot-toast"

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
        const body = {
            ...variant,
            product_id
        }
        try {
            const { data } = await post('/variants', body);
            if (data.success) {
                console.log(data)
                toast.success("تنوع با موفقیت ساخته شد.")
                return data
            }
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