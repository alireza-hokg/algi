import { useState } from "react";
import Modal from "../components/common/Modal.jsx";
import CreateProductImage from "../components/ui/product-images/CreateProductImage.jsx";
import DeleteProductImage from "../components/ui/product-images/DeleteProductImage.jsx";
import { useModal } from "../hooks/useModal.js";
import { useProducts } from "../hooks/useProducts.js";

const AllProductsImages = () => {
    const {
        products
    } = useProducts();

    const {
        isActive,
        modalType,
        setModalType,
        toggleActive,
    } = useModal()

    const [product, setProduct] = useState({});
    const [imageId, setImageId] = useState(null)

    return (
        <>
    {products?.body?.rows?.map(product => (
        <section
            className="py-8"
        >
            <div className="mb-6 flex items-center justify-between">
                <h2
                    className="text-3xl md:text-4xl font-bold text-gray-800"
                >
                    {product.name}
                </h2>

                <span className="text-sm text-gray-500">
                    {product?.Product_Images?.length || 0} تصویر
                </span>
            </div>

            <ul
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                gap-6"
            >
                {product?.Product_Images.length > 0 ? (
                    product?.Product_Images?.map(image => (
                        (
                            <li
                                className="group overflow-hidden rounded-2xl border border-gray-200
                                bg-white shadow-sm transition-all duration-300
                                hover:-translate-y-1 hover:shadow-lg"
                                key={image.id}
                            >
                                <div
                                    className="relative aspect-4/3 overflow-hidden bg-gray-100"
                                >
                                    <img
                                        src={`http://localhost:9000/uploads/${image?.image_url}`}
                                        alt={image?.image_text || ""}
                                        className="h-full w-full object-cover
                                        transition-transform duration-500
                                        group-hover:scale-105"
                                    />

                                    <div
                                        className="absolute inset-0 bg-linear-to-t
                                        from-black/20 via-transparent to-transparent
                                        opacity-0 transition-opacity duration-300
                                        group-hover:opacity-100"
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-3 p-4">
                                    <span
                                        className="truncate text-sm text-gray-500"
                                    >
                                        {image?.image_text || "بدون توضیحات"}
                                    </span>

                                    <button
                                        className="shrink-0 rounded-lg bg-red-50 px-4 py-2
                                        text-sm font-medium text-red-600
                                        transition-all duration-200
                                        hover:bg-red-500 hover:text-white
                                        active:scale-95 cursor-pointer"
                                        onClick={() => {
                                            setModalType("delete")
                                            toggleActive()
                                            setImageId(image?.id)
                                        }}
                                    >
                                        حذف عکس
                                    </button>
                                </div>
                            </li>
                        )
                    ))
                ) : (
                    <p
                        className="col-span-full flex min-h-40 items-center
                        justify-center rounded-2xl border border-dashed
                        border-gray-300 bg-gray-50 text-sm text-gray-500"
                    >
                        عکسی برای این محصول وجود ندارد
                    </p>
                )}
            </ul>
        </section>
    ))}

    {
        isActive ? (
            <Modal
                isActive={isActive}
                toggleActive={toggleActive}
            >
                {modalType === "create" && (
                    <CreateProductImage
                        product={product}
                        toggleActive={toggleActive}
                    />
                )}

                {modalType === "delete" && (
                    <DeleteProductImage
                        imageId={imageId}
                        toggleActive={toggleActive}
                    />
                )}
            </Modal>
        ) : null
    }
</>
    )
}
export default AllProductsImages;
