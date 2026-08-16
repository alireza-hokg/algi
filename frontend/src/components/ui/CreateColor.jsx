const CreateColor = ({
    handleCreateColor,
    color,
    onChangeColor
}) => {
    return (
        <div
            className="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mx-auto my-6"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Size */}
                <div className="flex flex-col gap-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        نام رنگ
                    </label>
                    <input
                        name="name"
                        placeholder="مثلاً XL"
                        className="rounded-lg border border-gray-300 bg-gray-50
                        px-3 py-2.5 text-sm outline-none transition
                        focus:border-blue-500 focus:bg-white
                        focus:ring-2 focus:ring-blue-100"
                        value={color.name}
                        onChange={onChangeColor}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        کد رنگ
                    </label>
                    <input
                        name="hex"
                        placeholder="مثلاً 000000"
                        className="rounded-lg border border-gray-300 bg-gray-50
                        px-3 py-2.5 text-sm outline-none transition
                        focus:border-blue-500 focus:bg-white
                        focus:ring-2 focus:ring-blue-100"
                        value={color.hex}
                        onChange={onChangeColor}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end border-t border-gray-100 pt-5">
                <button
                    onClick={() => handleCreateColor(color)}
                    type="button"
                    className="rounded-lg bg-gray-900 px-6 py-2.5
                    text-sm font-medium text-white transition
                    hover:bg-gray-800 active:scale-95 cursor-pointer"
                >
                    افزودن رنگ
                </button>
            </div>
        </div>
             
    )
}
export default CreateColor;