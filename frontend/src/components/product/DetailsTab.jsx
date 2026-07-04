import { ChevronDown } from "lucide-react";
import "./style.css";
import Specification from "./Specification.jsx";
import { useState } from "react";

const DetailsTab = ({products}) => {

    const [activeTab, setActiveTab] = useState(1);

    const tabs = [
        {
            id: 1,
            label: "مشخصات بیشتر",
            content: <Specification products={products} activeTab={activeTab} />
        },
        {
            id: 2,
            label: "توضیحات",
            content: <Specification products={products} activeTab={activeTab} />
        },
        {
            id: 3,
            label: "نظرات",
            content: <Specification products={products} activeTab={activeTab} />
        },
    ]

    const toggleTab = tabId => {
        setActiveTab(activeTab => activeTab === tabId ? null : tabId)
    }

    return(
        <>
            <ul
                className="flex flex-col lg:hidden mt-6"
            >
                {tabs.map(tab=> (
                    <li
                        key={tab.id}
                    >
                        <button
                            onClick={()=> toggleTab(tab.id)}
                            className="w-full relative flex items-center gap-x-2 pb-4 font-bold text-gray-500 mb-4
                            hover:text-amber-500 duration-150 ease-in-out border-b border-b-gray-200 cursor-pointer">
                            <ChevronDown color="#ccc"/>
                            {tab.label}
                        </button>
                        {tab.id === activeTab ? tab.content : null}
                    </li>
                ))}
            </ul>
            <ul
                className="hidden lg:block justify-center gap-x-4"
            >
                <div className="flex justify-center gap-x-6">
                    {tabs.map(tab=> (
                        <li key={tab.id}>
                            <button
                                onClick={()=> toggleTab(tab.id)}
                                className={`relative ${activeTab === tab.id ? "" : "tabs"} flex items-center 
                                py-6 font-bold text-gray-500 mb-4 hover:text-amber-500 
                                cursor-pointer border-t-4 border-transparent
                                ${activeTab == tab.id ? "border-t-amber-500 selected" : null}
                                duration-150 ease-in-out`}>
                                <ChevronDown color="#ccc" className="lg:hidden"/>
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </div>
                {tabs.map(tab=> (
                    <div key={tab.id}>
                        {tab.id === activeTab ? tab.content : null}
                    </div>
                ))}
            </ul>
        </>
    )
}
export default DetailsTab;