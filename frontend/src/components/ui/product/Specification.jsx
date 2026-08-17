const Specification = ({variants, activeTab}) => {

    const attributes = [
        {key: "height", label: "قد", unit: "سانتی متر"},
        {key: "waist", label: "دور کمر", unit: "سانتی متر"},
        {key: "width", label: "عرض", unit: "سانتی متر"},
    ]

    const existingAttributes = attributes.filter(attr=> {
        return variants?.map(product=> product[attr.key])
    })

    if (existingAttributes.length === 0) return null;
    
    return (
        <div className={`mb-8 scale-y-0 ${activeTab ? "scale-y-100 duration-1000" : null}`}>
            {variants?.map((variant) => (
                <div
                    key={variant.id}
                    className="max-w-lg mx-auto rounded-lg py-4 mb-10"
                >
                    <div className="text-center mb-2">
                        <span className="font-bold text-gray-700">سایز {variant.size}</span>
                    </div>
                    <ul className="flex flex-col">
                        {existingAttributes.map(({key, label, unit}) => {
                            return variant[key] ? (
                                <li
                                    key={key}
                                    className={`flex-1 flex items-center justify-between py-3
                                    ${variant[key] ? "border-b-gray-200 border-b" : null} text-sm`}
                                >
                                    {variant[key] ? (
                                        <>
                                            <span className="font-bold text-gray-800 ">{label}</span>
                                            <span className="text-gray-400">{variant[key]}{" "}{unit}</span>
                                        </>
                                    ) : null}
                                </li>
                            ) : null
                        })}
                    </ul>
                    <div className="border-b border-b-gray-200 py-3">
                        <div className="mb-4">
                            <span>رنگ ها</span>
                        </div>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            {variant?.Colors?.map(c => (
                                <div
                                    key={c.id}
                                    className="flex"
                                >
                                    <span>{c.name}</span>
                                    <span
                                        style={{ backgroundColor: `#${c.hex}`}}
                                        className={`w-6 h-6 block`}
                                    ></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Specification;