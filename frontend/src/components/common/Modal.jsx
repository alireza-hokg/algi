import { X } from "lucide-react";

const Modal = ({
    toggleActive,
    children
}) => {
    const handleClickOutside = e => {
        if (e.target === e.currentTarget) {
            toggleActive();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center
            bg-black/40 backdrop-blur-sm p-4"
            onClick={handleClickOutside}
        >
            <div
                className="relative flex w-full max-w-md flex-col
                rounded-xl bg-white p-6 shadow-2xl"
            >
                <X
                    className="absolute right-4 top-4 cursor-pointer
                    rounded-md text-gray-400 transition
                    hover:bg-gray-100 hover:text-gray-700"
                    size={30}
                    onClick={toggleActive}
                />

                <div className="pt-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;