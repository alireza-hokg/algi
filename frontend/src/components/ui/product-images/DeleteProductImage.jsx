import { useModal } from "../../../hooks/useModal.js";
import { useProductImages } from "../../../hooks/useProductImages.js";

const DeleteProductImage = ({ product }) => {

    const {
        handleDeleteImage
    } = useProductImages()

    const {
        toggleActive
    } = useModal();
    return (
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

            <div className="py-6 text-center">
                <p className="text-lg font-medium text-gray-800">
                    آیا می‌خواهید این تصویر حذف شود؟
                </p>

                <p className="mt-2 text-sm text-gray-500">
                    این عملیات قابل بازگشت نیست.
                </p>
            </div>

            <div className="flex justify-center gap-3">
                <button
                    type="button"
                    className="rounded-md border border-gray-300 px-5 py-2
                    text-sm font-medium text-gray-700 cursor-pointer
                    transition hover:bg-gray-100"
                    onClick={toggleActive}
                >
                    خیر
                </button>

                <button
                    type="button"
                    className="rounded-md bg-linear-to-r from-red-400 to-red-500
                    px-5 py-2 text-sm font-medium text-white cursor-pointer
                    transition hover:from-red-500 hover:to-red-600"
                    onClick={()=> handleDeleteImage(product?.id)}
                >
                    بله، حذف کن
                </button>
            </div>

        </div>
    );
};

export default DeleteProductImage;