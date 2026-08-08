import { useParams } from "react-router-dom";

import Modal from "../components/common/Modal";
import CreateProductImage from "../components/ui/product-images/CreateProductImage.jsx";
import { useModal } from "../hooks/useModal.js";
import { useProductImages } from "../hooks/useProductImages.js";
import DeleteProductImage from "../components/ui/product-images/DeleteProductImage.jsx";

const ProductImages = () => {
    const { id } = useParams();

    const {
        isActive,
        toggleActive,
        modalType,
        setModalType
    } = useModal()
    
    const {
        product,
    } = useProductImages(id);

    return (
        <section>
            <button
                className="bg-linear-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-md
                cursor-pointer mb-8"
                to={`/products/${product.id}/images`}
                onClick={()=> {
                    toggleActive();
                    setModalType("create")
                }}
            >
                ساخت عکس برای محصول
            </button>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    product?.Product_Images?.map(image => (
                        <li className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
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
                                        toggleActive();
                                        setModalType("delete")
                                    }}
                                >
                                    حذف عکس
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
            {
                isActive ? (
                    <Modal
                        isActive={isActive}
                        toggleActive={toggleActive}
                    >
                        {modalType === "create" && (
                            <CreateProductImage product={product} />
                        )}

                        {modalType === "delete" && (
                            <DeleteProductImage />
                        )}
                    </Modal>
                ) : null
            }
        </section>
    )
}
export default ProductImages;