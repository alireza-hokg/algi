import CreateProduct from "../components/ui/CreateProduct";
import ProductGrid from "../components/ui/ProductGrid";
import { useProducts } from "../hooks/useProducts.js";

const Products = () => {
    const { products, isEmpty } = useProducts();
    return (
        <section className="">
            <CreateProduct />
            {
                isEmpty === 0 ? (
                    <div>محصولی وجود ندارد</div>
                ) : (
                    <ProductGrid products={products?.body}/>
                )
            }
        </section>
    )
}
export default Products;