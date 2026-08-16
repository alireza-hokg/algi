import { useCompare } from "../hooks/useCompare.js";

const Compare = () => {
    const {
        compareList
    } = useCompare();

    console.log(compareList)
    const variantFields = [
        { key: "size", label: "سایز" },
        { key: "quantity", label: "تعداد" },
        { key: "height", label: "ارتفاع" },
        { key: "width", label: "عرض" },
        { key: "waist", label: "دور کمر" },
    ]

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        {/* ستون ویژگی */}
                        <th className="w-40 border p-4"></th>

                        {/* محصولات */}
                        {compareList.length > 0 ? compareList?.map(product => {

                            const mainImage =
                                product.Product_Images?.find(
                                    image => image.is_main
                                ) ?? product.Product_Images?.[0]

                            return (
                                <th
                                    key={product.id}
                                    className="min-w-60 border p-4"
                                >
                                    <div className="flex flex-col items-center gap-3">

                                        {mainImage && (
                                            <img
                                                src={`http://localhost:9000/uploads/${mainImage.image_url}`}
                                                alt={product.name}
                                                className="w-32 h-32 object-cover rounded"
                                            />
                                        )}

                                        <span className="font-bold">
                                            {product.name}
                                        </span>

                                    </div>
                                </th>
                            )
                        }) : null}
                    </tr>
                </thead>

                <tbody>
                    {compareList.length > 0 ? variantFields?.map(field => (
                        <tr key={field.key}>

                            {/* نام ویژگی */}
                            <td className="border p-4 font-semibold text-center">
                                {field.label}
                            </td>

                            {/* مقدار هر محصول */}
                            {compareList?.map(product => {

                                const values = product?.Variants
                                    ?.map(variant => variant[field.key])
                                    .filter(value => value != null)

                                return (
                                    <td
                                        key={product.id}
                                        className="border p-4 text-center"
                                    >
                                        {values?.length
                                            ? values.join(" / ")
                                            : "-"
                                        }
                                    </td>
                                )
                            })}

                        </tr>
                    )) : <tr>هیچ محصولی برای مقایسه وجود ندارد</tr>}
                </tbody>

            </table>
        </div>
    )
}
export default Compare;