import { useModal } from "../../hooks/useModal.js";
import Modal from "../common/Modal.jsx";
import ProductItem from "../common/ProductItem/ProductItem.jsx"

const ProductGrid = ({ 
    products,
    product,
    setProduct,
    onChangeProduct,
    getProduct,
    handleUpdateProduct,
    emptyMessage = "محصولی وجود ندارد"
}) => {
    
    const {
        isActive,
        toggleActive,
    } = useModal();

    if (!products || products?.rows?.length === 0) {
        return <div className="text-center py-10 text-gray-500">{emptyMessage}</div>;
    }
    return (
        <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12
                gap-x-6"
            >
                {products?.rows?.map(product=> (
                    <ProductItem
                        key={product.id}
                        product={product}
                        setProduct={setProduct}
                        getProduct={getProduct}
                        toggleActive={toggleActive}
                    />
                ))}
            </ul>
            {isActive
            ? (
            <Modal
                toggleActive={toggleActive}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* name */}
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            نام محصول
                        </label>

                        <input
                            name="name"
                            placeholder="مثلاً XL"
                            className="rounded-lg border border-gray-300 bg-gray-50
                            px-3 py-2.5 text-sm outline-none transition
                            focus:border-blue-500 focus:bg-white
                            focus:ring-2 focus:ring-blue-100"
                            value={product?.name}
                            onChange={onChangeProduct}
                        />
                    </div>

                    {/* price */}
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            قیمت
                        </label>

                        <input
                            name="price"
                            type="number"
                            placeholder="10"
                            className="rounded-lg border border-gray-300 bg-gray-50
                            px-3 py-2.5 text-sm outline-none transition
                            focus:border-blue-500 focus:bg-white
                            focus:ring-2 focus:ring-blue-100"
                            value={product?.price}
                            onChange={onChangeProduct}
                        />
                        <span className="text-xs text-gray-400">
                            تومان
                        </span>
                    </div>

                    {/* discount */}
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            تخفیف
                        </label>
                        <div className="flex items-center gap-x-2">
                            <input
                                name="discount"
                                type="text"
                                placeholder="50"
                                className="w-full rounded-lg border border-gray-300
                                bg-gray-50 px-3 py-2.5 text-sm outline-none transition
                                focus:border-blue-500 focus:bg-white
                                focus:ring-2 focus:ring-blue-100"
                                value={product?.discount || undefined}
                                onChange={onChangeProduct}
                            />

                            <span className="text-xs text-gray-400">
                                درصد
                            </span>
                        </div>
                    </div>

                    {/* discount_price */}
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            قیمت تخفیف
                        </label>

                        <div className="flex items-center gap-x-2">
                            <input
                                name="discount_price"
                                type="number"
                                placeholder="70"
                                className="w-full rounded-lg border border-gray-300
                                bg-gray-50 px-3 py-2.5 text-sm outline-none transition
                                focus:border-blue-500 focus:bg-white
                                focus:ring-2 focus:ring-blue-100"
                                value={product?.discount_price || undefined}
                                onChange={onChangeProduct}
                            />

                            <span className="text-xs text-gray-400">
                                cm
                            </span>
                        </div>
                    </div>

                    {/* sku */}
                    <div className="flex flex-col gap-y-2 sm:col-span-2">
                        <label className="text-sm font-medium text-gray-700">
                            کد
                        </label>

                        <div className="flex items-center gap-x-2">
                            <input
                                name="sku"
                                type="text"
                                placeholder="80"
                                className="w-full rounded-lg border border-gray-300
                                bg-gray-50 px-3 py-2.5 text-sm outline-none transition
                                focus:border-blue-500 focus:bg-white
                                focus:ring-2 focus:ring-blue-100"
                                value={product?.sku}
                                onChange={onChangeProduct}
                            />
                        </div>
                    </div>

                </div>
                <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                    type="button"
                    className="rounded-lg border border-gray-300 px-5 py-2.5
                    text-sm font-medium text-gray-600 transition
                    hover:bg-gray-50 cursor-pointer"
                    onClick={toggleActive}
                >
                    انصراف
                </button>

                <button
                    onClick={()=>handleUpdateProduct(product, product.id)}
                    type="button"
                    className="rounded-lg bg-gray-900 px-6 py-2.5
                    text-sm font-medium text-white transition
                    hover:bg-gray-800 active:scale-95 cursor-pointer"
                >
                    افزودن تنوع
                </button>
            </div>
            </Modal>
            )
            : null}
        </>
    )
}
export default ProductGrid;