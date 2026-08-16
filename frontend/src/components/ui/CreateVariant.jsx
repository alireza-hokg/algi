
const CreateVariant = ({ 
    variant,
    onChangeVariant,
    handleCreateVariant,
    product_id
 }) => {
    
    return (
        <div className="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mx-auto">

            {/* Header */}
            <div className="mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-800">
                    افزودن ویژگی محصول
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    مشخصات این تنوع محصول را وارد کنید
                </p>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* Size */}
                <div className="flex flex-col gap-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        سایز
                    </label>

                    <input
                        name="size"
                        placeholder="مثلاً XL"
                        className="rounded-lg border border-gray-300 bg-gray-50
                        px-3 py-2.5 text-sm outline-none transition
                        focus:border-blue-500 focus:bg-white
                        focus:ring-2 focus:ring-blue-100"
                            value={variant.size}
                            onChange={onChangeVariant}
                    />
                </div>

                {/* Quantity */}
                <div className="flex flex-col gap-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        تعداد
                    </label>

                    <input
                        name="quantity"
                        type="number"
                        placeholder="10"
                        className="rounded-lg border border-gray-300 bg-gray-50
                        px-3 py-2.5 text-sm outline-none transition
                        focus:border-blue-500 focus:bg-white
                        focus:ring-2 focus:ring-blue-100"
                            value={variant.quantity}
                            onChange={onChangeVariant}
                    />
                </div>

                {/* Width */}
                <div className="flex flex-col gap-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        عرض
                    </label>

                    <div className="flex items-center gap-x-2">
                        <input
                            name="width"
                            type="number"
                            placeholder="50"
                            className="w-full rounded-lg border border-gray-300
                            bg-gray-50 px-3 py-2.5 text-sm outline-none transition
                            focus:border-blue-500 focus:bg-white
                            focus:ring-2 focus:ring-blue-100"
                            value={variant.width}
                            onChange={onChangeVariant}
                        />

                        <span className="text-xs text-gray-400">
                            cm
                        </span>
                    </div>
                </div>

                {/* Height */}
                <div className="flex flex-col gap-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        ارتفاع
                    </label>

                    <div className="flex items-center gap-x-2">
                        <input
                            name="height"
                            type="number"
                            placeholder="70"
                            className="w-full rounded-lg border border-gray-300
                            bg-gray-50 px-3 py-2.5 text-sm outline-none transition
                            focus:border-blue-500 focus:bg-white
                            focus:ring-2 focus:ring-blue-100"
                            value={variant.height}
                            onChange={onChangeVariant}
                        />

                        <span className="text-xs text-gray-400">
                            cm
                        </span>
                    </div>
                </div>

                {/* Waist */}
                <div className="flex flex-col gap-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                        دور کمر
                    </label>

                    <div className="flex items-center gap-x-2">
                        <input
                            name="waist"
                            type="number"
                            placeholder="80"
                            className="w-full rounded-lg border border-gray-300
                            bg-gray-50 px-3 py-2.5 text-sm outline-none transition
                            focus:border-blue-500 focus:bg-white
                            focus:ring-2 focus:ring-blue-100"
                            value={variant.waist}
                            onChange={onChangeVariant}
                        />

                        <span className="text-xs text-gray-400">
                            cm
                        </span>
                    </div>
                </div>

            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                    type="button"
                    className="rounded-lg border border-gray-300 px-5 py-2.5
                    text-sm font-medium text-gray-600 transition
                    hover:bg-gray-50 cursor-pointer"
                >
                    انصراف
                </button>

                <button
                    onClick={
                        ()=> handleCreateVariant(variant, product_id)
                    }
                    type="button"
                    className="rounded-lg bg-gray-900 px-6 py-2.5
                    text-sm font-medium text-white transition
                    hover:bg-gray-800 active:scale-95 cursor-pointer"
                >
                    افزودن تنوع
                </button>
            </div>

        </div>
    )
}
export default CreateVariant;
