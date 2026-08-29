import ErrorDisplay from "../common/ErrorDisplay.jsx";
import Loading from "../common/Loading.jsx";
import ProductSectionTitle from "./ProductSectionTitle.jsx";
import ProductGrid from "../ui/ProductGrid.jsx";
import { useProducts } from "../../hooks/useProducts.js";
import Container from "../layout/Container.jsx";

const ProductList = () => {
    const { 
        loading,
        error,
        fetchData,
        products,
        isEmpty,
        product,
        setProduct,
        onChangeProduct,
        getProduct,
        handleUpdateProduct
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
        <>
            <ProductSectionTitle />
            <Container>
                {
                    isEmpty === 0 ? (
                        <div>محصولی وجود ندارد</div>
                    ) : (
                        <ProductGrid
                            products={products?.body}
                            product={product}
                            setProduct={setProduct}
                            onChangeProduct={onChangeProduct}
                            getProduct={getProduct}
                            handleUpdateProduct={handleUpdateProduct}
                        />
                    )
                }
            </Container>
        </>
    )
}
export default ProductList;