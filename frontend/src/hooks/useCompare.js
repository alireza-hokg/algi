import { useContext } from "react"
import { CompareContext } from "../contexts/CompareContext.js"

export const useCompare = () => {
    const context = useContext(CompareContext)
    if (!context) {
        throw new Error("useCompare must be within the CompareProvider")
    }
    return context
}