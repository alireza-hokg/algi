import { X } from "lucide-react"

const SidebarHeader = ({
    onClose,
    title
}) => {
    <div className="flex justify-between mb-8 mt-2">
        <h1 className="text-3xl">
            { title }
        </h1>
        <button
            className="cursor-pointer p-2 rounded-full"
            onClick={onClose}
        >
            <X color="#fb2c36" size={30}/>
        </button>
    </div>
}
export default SidebarHeader;