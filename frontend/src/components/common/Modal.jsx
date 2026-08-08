import { X } from "lucide-react"

const Modal = ({
    toggleActive,
    children
}) => {
    const handleClickOutside = e => {
        if (e.target === e.currentTarget) {
            toggleActive()
        }
    }
    return (
        <div
            className="z-10 fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm"
            onClick={handleClickOutside}
        >
            <div className="bg-white flex flex-col relative max-w-sm min-h-80 rounded-md shadow-lg py-4 px-8
            ">
                <X
                    className="absolute top-0 left-0 "
                    size={32}
                    onClick={toggleActive}
                />
                {children}
            </div>
        </div>
    )
}
export default Modal