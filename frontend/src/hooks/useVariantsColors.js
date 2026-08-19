import { toast } from "react-hot-toast";

import { useState } from "react";

import { post } from "../services/api.js";

export const useVariantsColors = () => {
    const [variantColor, setVariantColor] = useState({
        color_id: "",
        variant_id: "",
        stock_quantity: ""
    });

    const handleCreateVariantColor = async (variantColorBody) => {
        try {
            const { data } = await post("/variants-colors", variantColorBody)
            if (data.success) {
                toast.success("رنگ برای این نوع با موفقیت ساخته شد.")
                return data
            }
        }
        catch(err) {
            console.log(err.message)
            toast.error(err?.response?.data?.message)
        }
    }

    return {
        variantColor,
        setVariantColor,
        handleCreateVariantColor,
    }
}