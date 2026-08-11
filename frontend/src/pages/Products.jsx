import Container from "../components/layout/Container.jsx";
import CreateProduct from "../components/ui/CreateProduct";
import ProductGrid from "../components/ui/ProductGrid";
import { useAuth } from "../hooks/useAuth.js";
import { useProducts } from "../hooks/useProducts.js";

const Products = () => {
    const { products, isEmpty } = useProducts();
    const { user } = useAuth();
    return (
        <Container>
            {user?.role === "admin" && (
                <div className="mb-14">
                    <CreateProduct />
                </div>
            )}
            {
                isEmpty === 0 ? (
                    <div>محصولی وجود ندارد</div>
                ) : (
                    <ProductGrid products={products?.body}/>
                )
            }
        </Container>
    )
}
export default Products;