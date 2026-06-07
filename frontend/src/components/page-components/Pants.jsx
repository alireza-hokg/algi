const Pants = ({product}) => {
    const attributes = [
        {key: "height", label: "قد", unit: "سانتی متر"},
        {key: "waist", label: "دور کمر", unit: "سانتی متر"},
        {key: "width", label: "عرض", unit: "سانتی متر"},
    ]
    const existingAttributes = attributes.filter(attr=> product[attr.key])
    if (existingAttributes.length === 0) return null; 
    
    return (
        <ul className="flex flex-wrap gap-2">
            {existingAttributes.map(({key, label, unit}) => (
                <li
                    key={key}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full text-sm border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200"
                >
                    <span className="font-semibold text-gray-800">{label}:</span>
                    <span className="text-gray-600">{product[key]} <span className="text-gray-400 text-xs">{unit}</span></span>
                </li>
            ))}
        </ul>
    )
}
export default Pants;