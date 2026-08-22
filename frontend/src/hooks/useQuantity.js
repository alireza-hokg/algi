import { useState } from "react";

export const useQuantity = () => {
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity<=1) {
            setQuantity(1)
        } else {
            setQuantity(quantity=> quantity-1)
        }
    }

    const increaseQuantity = () => {
        setQuantity(quantity=> +quantity+1)
    }

    const onChangeQuantity = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setQuantity(value)
        }
    }

    return {
        quantity,
        decreaseQuantity,
        increaseQuantity,
        onChangeQuantity,
    }
}