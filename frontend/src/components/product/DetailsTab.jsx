import { ChevronDown } from "lucide-react";
import "./style.css";

const DetailsTab = () => {
    return(
       <ul
            className="flex flex-col lg:flex-row lg:gap-x-4 lg:justify-center"
        >
            <li className="relative tabs flex items-center gap-x-2 pb-4 lg:py-4 font-bold text-gray-500 mb-4
            hover:text-amber-500 lg:hover:text-gray-800 duration-150 ease-in-out border-b
            lg:border-b-0 border-b-gray-200 cursor-pointer">
                <ChevronDown color="#ccc" className="lg:hidden"/>
                مشخصات بیشتر
            </li>
            <li className="relative tabs flex items-center gap-x-2 pb-4 lg:py-4 font-bold text-gray-500 mb-4
            hover:text-amber-500 lg:hover:text-gray-800 duration-150 ease-in-out border-b
            lg:border-b-0 border-b-gray-200 cursor-pointer">
                <ChevronDown color="#ccc" className="lg:hidden"/>
                توضیحات
            </li>
            <li className="relative tabs flex items-center gap-x-2 pb-4 lg:py-4 font-bold text-gray-500 mb-4
            hover:text-amber-500 lg:hover:text-gray-800 duration-150 ease-in-out border-b
            lg:border-b-0 border-b-gray-200 cursor-pointer">
                <ChevronDown color="#ccc" className="lg:hidden"/>
                نظرات
            </li>
        </ul>
    )
}
export default DetailsTab;