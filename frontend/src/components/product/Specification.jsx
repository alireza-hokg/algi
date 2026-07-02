const Specification = ({products, activeTab}) => {

    const attributes = [
        {key: "height", label: "قد", unit: "سانتی متر"},
        {key: "waist", label: "دور کمر", unit: "سانتی متر"},
        {key: "width", label: "عرض", unit: "سانتی متر"},
    ]

    const existingAttributes = attributes.filter(attr=> {
        return products.map(product=> product[attr.key])
    })

    if (existingAttributes.length === 0) return null;
    
    return (
        <div className={`mb-8 scale-y-0 ${activeTab ? "scale-y-100 duration-1000" : null}`}>
            {products.map((product) => (
                <div
                    key={product.id}
                    className="max-w-lg mx-auto rounded-lg py-4 mb-10"
                >
                    <div className="text-center mb-2">
                        <span className="font-bold text-gray-700">سایز {product.size}</span>
                    </div>
                    <ul className="flex flex-col">
                        {existingAttributes.map(({key, label, unit}) => {
                            return product[key] ? (
                                <li
                                    key={key}
                                    className={`flex-1 flex items-center justify-between px-3 py-2
                                    ${product[key] ? "border-b-gray-200 border-b" : null} text-sm`}
                                >
                                    {product[key] ? (
                                        <>
                                            <span className="font-semibold text-gray-800">{label}</span>
                                            <span className="text-gray-400">{product[key]}{" "}{unit}</span>
                                        </>
                                    ) : null}
                                </li>
                            ) : null
                        })}
                    </ul>
                </div>
            ))}
        </div>
    )
}
export default Specification;