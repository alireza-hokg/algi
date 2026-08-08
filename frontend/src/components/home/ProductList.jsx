import ErrorDisplay from "../common/ErrorDisplay.jsx";
import Loading from "../common/Loading.jsx";
import ProductSectionTitle from "./ProductSectionTitle.jsx";
import ProductGrid from "../ui/ProductGrid.jsx";
import { useProducts } from "../../hooks/useProducts.js";

const ProductList = () => {
    const { 
        loading,
        error,
        fetchData,
        products,
        isEmpty
    } = useProducts();
    
    if (loading) {
        return (
            <Loading />
        )
    }

    if (error) {
        return (
            <ErrorDisplay 
                error={error}
                onRetry={()=> {
                    fetchData()
                }}
                showDetails={true}
            /> 
        )
    }
    return (
        <div className="my-10">
            {/* Title for products */}
            <ProductSectionTitle />
            {/* Products list */}
            {
                isEmpty === 0 ? (
                    <div>محصولی وجود ندارد</div>
                ) : (
                    <ProductGrid products={products?.body}/>
                )
            }
        </div>
    )
}
export default ProductList;