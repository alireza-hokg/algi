import Loading from "../../components/common/Loading";
import Modal from "../../components/common/Modal";
import Container from "../../components/layout/Container"
import CreateColor from "../../components/ui/CreateColor"
import { useColor } from "../../hooks/useColor"
import { useModal } from "../../hooks/useModal";

const Colors = () => {
    const {
        color,
        setColor,
        onChangeColor,
        colors,
        loading,
        handleCreateColor,
        handleUpdateColor
    } = useColor();

    const {
        isActive,
        setIsActive,
        toggleActive,
    } = useModal()

    if (loading) {
        return <Loading />
    }

    return (
        <Container>
            {/* Header */}
            <div className="mb-6 border-b border-gray-100 pb-4 text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    افزودن رنگ
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    رنگ این تنوع محصول را وارد کنید
                </p>
            </div>
            <CreateColor
                color={color}
                setColor={setColor}
                onChangeColor={onChangeColor}
                handleCreateColor={handleCreateColor}
            />
            <ul
                className="grid grid-cols-1 gap-y-4"
            >
                {colors?.map(c=> (
                    <li
                        className="px-4 py-2 shadow-sm rounded-sm flex justify-between bg-gray-50"
                        key={c.id}
                    >
                        <div className="flex justify-between min-w-25">
                            <span>{c.name}</span>
                            <span
                                style={{ backgroundColor: `#${c.hex}`}}
                                className={`w-6 h-6 block border`}
                            ></span>
                        </div>
                        <div>
                            <button
                                className="rounded-lg border border-blue-200 bg-blue-50 px-6 py-2.5
                                text-sm font-medium text-blue-600 transition
                                hover:bg-blue-100 active:scale-95 cursor-pointer"
                                onClick={() => {
                                    setColor(c)
                                    toggleActive()
                                }}
                            >
                                ویرایش
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {isActive ? (
                <Modal
                    toggleActive={toggleActive}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Size */}
                        <div className="flex flex-col gap-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                نام رنگ
                            </label>
                            <input
                                name="name"
                                placeholder="مشکی"
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
                    <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
                        <button
                            type="button"
                            className="rounded-lg border border-gray-300 px-5 py-2.5
                            text-sm font-medium text-gray-600 transition
                            hover:bg-gray-50 cursor-pointer"
                            onClick={()=> {
                                setColor({})
                                toggleActive()
                            }}
                        >
                            انصراف
                        </button>

                        <button
                            onClick={() => {
                                const isUpdated = handleUpdateColor(color, color.id);
                                if (isUpdated) {
                                    setIsActive(false)
                                }
                            }}
                            type="button"
                            className="rounded-lg bg-gray-900 px-6 py-2.5
                            text-sm font-medium text-white transition
                            hover:bg-gray-800 active:scale-95 cursor-pointer"
                        >
                            ویرایش رنگ
                        </button>
                    </div>
                </Modal>
            ) : null}
        </Container>
    )
}
export default Colors