import { useState } from "react";

export const useQuantity = () => {
    const [count, setCount] = useState(1);

    const decreaseCount = () => {
        if (count<=1) {
            setCount(1)
        } else {
            setCount(count=> count-1)
        }
    }

    const increaseCount = () => {
        setCount(count=> +count+1)
    }

    const onChangeCount = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setCount(value)
        }
    }

    return {
        count,
        decreaseCount,
        increaseCount,
        onChangeCount,
    }
}