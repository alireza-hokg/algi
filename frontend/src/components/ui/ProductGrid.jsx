import ProductItem from "../common/ProductItem.jsx"

const ProductGrid = ({ products, emptyMessage = "محصولی وجود ندارد"}) => {
    if (!products || products?.rows?.length === 0) {
        return <div className="text-center py-10 text-gray-500">{emptyMessage}</div>;
    }
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12
            gap-x-4 px-4 py-6 shadow-md rounded-md"
        >
            {products?.rows?.map(product=> (
                <ProductItem
                    key={product.id}
                    product={product}
                />
            ))}
        </ul>
    )
}
export default ProductGrid;