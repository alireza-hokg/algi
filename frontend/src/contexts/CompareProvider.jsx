import { toast } from "react-hot-toast"

import { useEffect, useState } from "react"

import { CompareContext } from "./CompareContext.js"

const CompareProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [compareList, setCompareList] = useState(() => {
        const saved = sessionStorage.getItem("compareProductList");

        return saved ? JSON.parse(saved) : []
    });
    
    const isCompared = (productId) => {
        return compareList.some(
            comparedProduct => comparedProduct.id === productId
        )
    }

    const handleAddCompare = (product) => {
        setLoading(true);
        const compareExists = isCompared(product.id)

        // اگر وجود داشت return کن
        if (compareExists) {
            toast.error("قبلا اضافه شده است.", {
                position: "top-center",
                duration: 2000
            })
            return
        }

        setCompareList(prev => {
            return [
                ...prev,
                product
            ]
        })
        setLoading(false);
    }

    const handleRemoveCompare = productId => {
        setLoading(false);
        setCompareList(prev => 
            prev.filter(product => product.id !== productId)
        )
        setLoading(true);
    }

    const clearCompare = () => {
        setCompareList([])
    }

    useEffect(() => {
        sessionStorage.setItem("compareProductList", JSON.stringify(compareList))

    }, [compareList])

    return (
        <CompareContext.Provider value={{
            compareList,
            handleAddCompare,
            handleRemoveCompare,
            clearCompare,
            isCompared,
            loading
        }}>
            {children}
        </CompareContext.Provider>
    )
}
export default CompareProvider