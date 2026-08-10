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
        <div>
            <ul
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
                {products?.body?.rows?.map(product => (
                    <li className="border-b">
                        <section
                            className="text-center"
                        >
                            <h2
                                className="text-center"
                            >
                                {product.name}
                            </h2>
                            <button
                                className="bg-linear-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-md
                                cursor-pointer text-sm"
                                onClick={()=> {
                                    setModalType("create")
                                    toggleActive()
                                    setProduct(product)
                                }}
                            >
                                ساخت عکس
                            </button>
                            <ul
                            >
                            {product?.Product_Images.length > 0 ? product?.Product_Images?.map(image => (
                                (
                                    <li 
                                        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                                        key={image.id}
                                    >
                                        <div className="bg-gray-100 overflow-hidden">
                                            <img
                                                src={`http://localhost:9000/uploads/${image?.image_url}`}
                                                alt={image?.image_text || ""}
                                                className="w-full h-64 object-cover hover:scale-110 transition-transform
                                                duration-300"
                                            />
                                        </div>
                                        <div className="flex justify-end p-3">
                                            <button
                                                className="rounded-md bg-linear-to-r from-red-400 to-red-500
                                                px-4 py-2 text-sm font-medium text-white cursor-pointer
                                                transition hover:from-red-500 hover:to-red-600"
                                                onClick={()=> {
                                                    setModalType("delete")
                                                    toggleActive();
                                                    setImageId(image?.id)
                                                }}
                                            >
                                                حذف عکس
                                            </button>
                                        </div>
                                    </li>
                                )
                            )) : <p>عکسی وجود ندارد</p>}
                            </ul>
                        </section>
                    </li>
                ))}
            </ul>
            {
                isActive ? (
                    <Modal
                        isActive={isActive}
                        toggleActive={toggleActive}
                    >
                        {modalType === "create" && (
                            <CreateProductImage product={product} toggleActive={toggleActive} />
                        )}

                        {modalType === "delete" && (
                            <DeleteProductImage imageId={imageId} toggleActive={toggleActive} />
                        )}
                    </Modal>
                ) : null
            }
        </div>
    )
}
export default AllProductsImages;
