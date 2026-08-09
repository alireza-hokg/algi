import { NumericFormat } from "react-number-format";

import { useCategory } from "../../hooks/useCategory.js";
import { useProducts } from "../../hooks/useProducts.js";

const CreateProduct = () => {
    const { 
        categories,
    } = useCategory();
    const {
        product,
        setProduct,
        onChangeProduct,
        handleCreateProduct
    } = useProducts();

    return(
        <div className="flex gap-x-12 gap-y-6 flex-wrap">
            <div className="flex gap-x-0.5 items-center">
                <label>نام محصول</label>
                <input
                    className="outline-0 border rounded-md py-1 px-2"
                    placeholder="شلوار"
                    type="text"
                    name="name"
                    onChange={onChangeProduct}
                    value={product?.name || ""}
                />
            </div>
            <div className="flex gap-x-1 items-center">
                <label>قیمت</label>
                <NumericFormat
                    thousandSeparator=","
                    className="outline-0 border rounded-md py-1 px-2"
                    placeholder="100,000"
                    name="price"
                    onValueChange={values => {
                        setProduct(prev => ({
                            ...prev,
                            price: values.formattedValue
                        }))
                    }}
                    value={product?.price || ""}
                />
                <span>تومان</span>
            </div>
            <div className="flex gap-x-0.5 items-center">
                <label>تخفیف</label>
                <input
                    className="outline-0 border rounded-md py-1 px-2"
                    placeholder="5 درصد"
                    type="number"
                    name="discount"
                    onChange={onChangeProduct}
                    value={product?.discount || ""}
                />
            </div>
            <div className="flex gap-x-0.5 items-center">
                <label>قیمت با تخفیف</label>
                <NumericFormat
                    className="outline-0 border rounded-md py-1 px-2"
                    disabled={true}
                    name="discount_price"
                    value={product?.discount_price || ""}
                    onValueChange={values => {
                        setProduct(prevProduct=> ({
                            ...prevProduct,
                            discount_price: values.formattedValue
                        }))
                    }}
                    readOnly={true}
                />
            </div>
            <div className="flex gap-x-0.5 items-center">
                <label>کد</label>
                <input
                    className="outline-0 border rounded-md py-1 px-2"
                    type="text"
                    name="sku"
                    onChange={onChangeProduct}
                    value={product?.sku || ""}
                />
            </div>
            <select
                name="category_id"
                onChange={onChangeProduct}
                value={product?.category_id || ""}
            >
                <option value={null}>دسته بندی</option>
                {categories?.body?.map(category=> (
                    <option 
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
            <button
                onClick={()=> handleCreateProduct(product)}
                className="py-2 px-4 bg-linear-to-r from-cyan-500 to-blue-500 rounded-md text-white cursor-pointer"
            >ساخت محصول
            </button>
        </div>
    )
}
export default CreateProduct;