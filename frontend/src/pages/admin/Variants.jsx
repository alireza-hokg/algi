import { useParams } from "react-router-dom";
import CreateVariant from "../../components/ui/CreateVariant";
import { useProduct } from "../../hooks/useProduct";
import { useVariants } from "../../hooks/useVariants";
import Container from "../../components/layout/Container";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/common/Modal";
import { useColor } from "../../hooks/useColor";

const Variants = () => {
    const { slug } = useParams();
    const attributes = [
        {key: "height", label: "قد", unit: "سانتی متر"},
        {key: "waist", label: "دور کمر", unit: "سانتی متر"},
        {key: "width", label: "عرض", unit: "سانتی متر"},
    ]

    const {
        isActive,
        toggleActive,
        modalType,
        setModalType
    } = useModal();

    const {
        product
    } = useProduct(slug)

    const {
        colors,
        color,
        setColor,
    } = useColor()
    
    const {
        variant,
        onChangeVariant,
        handleCreateVariant
    } = useVariants()

    const variants = product?.Variants;

    const existingAttributes = attributes.filter(attr => {
        return variants?.map(variant => variant[attr.key])
    })

    return (
        <Container>
            <h2
                className="text-center text-3xl my-10"
            >
                <span>نام محصول: </span>
                {product?.name}
            </h2>
            <CreateVariant 
                handleCreateVariant={handleCreateVariant}
                onChangeVariant={onChangeVariant}
                variant={variant}
                product_id={product?.id}
            />

            {variants?.map((product) => (
                <div
                    key={product.id}
                    className="max-w-lg mx-auto rounded-lg py-4 mb-10"
                >
                    <div className="text-center mb-2">
                        <span className="font-bold text-gray-700">سایز {product.size}</span>
                    </div>
                    <div>
                        <button
                            className="rounded-lg bg-gray-900 px-6 py-2.5
                            text-sm font-medium text-white transition
                            hover:bg-gray-800 active:scale-95 cursor-pointer"
                            onClick={() => {
                                setModalType("create")
                                toggleActive()
                            }}
                        >
                            اضافه کردن رنگ تنوع
                        </button>
                    </div>
                    <ul className="flex flex-col">
                        {existingAttributes.map(({key, label, unit}) => {
                            return product[key] ? (
                                <li
                                    key={key}
                                    className={`flex-1 flex items-center justify-between py-3
                                    ${product[key] ? "border-b-gray-200 border-b" : null} text-sm`}
                                >
                                    {product[key] ? (
                                        <>
                                            <span className="font-bold text-gray-800 ">{label}</span>
                                            <span className="text-gray-400">{product[key]}{" "}{unit}</span>
                                        </>
                                    ) : null}
                                </li>
                            ) : null
                        })}
                    </ul>
                </div>
            ))}
            {isActive ? (
    <Modal toggleActive={toggleActive}>
        {modalType === "create" ? (
            <div className="w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    اضافه کردن رنگ
                </h2>

                <div className="space-y-5">
                    <div>
                        <label
                            htmlFor="color"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            انتخاب رنگ
                        </label>

                        <select
                            id="color"
                            className="w-full rounded-lg border border-gray-300
                            bg-white px-4 py-3 text-sm text-gray-700
                            outline-none transition
                            focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            onChange={(e)=> {
                                let selectedOption = e.target.selectedOptions[0].dataset;
                                setColor(prev => ({
                                    ...prev,
                                    name: selectedOption.name,
                                    hex: selectedOption.hex
                                }))
                            }}
                        >
                            <option value="">
                                یک رنگ انتخاب کنید
                            </option>

                            {colors?.map(c => (
                                <option
                                    key={c.id}
                                    value={c.id}
                                    data-name={c.name}
                                    data-hex={c.hex}
                                >
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={toggleActive}
                            className="rounded-lg border border-gray-300
                            px-5 py-2.5 text-sm font-medium text-gray-600
                            transition hover:bg-gray-50 cursor-pointer"
                        >
                            انصراف
                        </button>

                        <button
                            type="button"
                            className="rounded-lg bg-gray-900
                            px-6 py-2.5 text-sm font-medium text-white
                            transition hover:bg-gray-800
                            active:scale-95 cursor-pointer"
                            onClick={() => {

                            }}
                        >
                            افزودن
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            <div className="w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    ویرایش رنگ
                </h2>

                <div className="space-y-5">
                    <div>
                        <label
                            htmlFor="color"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            انتخاب رنگ
                        </label>

                        <select
                            id="color"
                            className="w-full rounded-lg border border-gray-300
                            bg-white px-4 py-3 text-sm text-gray-700
                            outline-none transition
                            focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">
                                یک رنگ انتخاب کنید
                            </option>

                            
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={toggleActive}
                            className="rounded-lg border border-gray-300
                            px-5 py-2.5 text-sm font-medium text-gray-600
                            transition hover:bg-gray-50 cursor-pointer"
                        >
                            انصراف
                        </button>

                        <button
                            type="button"
                            className="rounded-lg bg-blue-600
                            px-6 py-2.5 text-sm font-medium text-white
                            transition hover:bg-blue-700
                            active:scale-95 cursor-pointer"
                        >
                            ویرایش
                        </button>
                    </div>
                </div>
            </div>
        )}
    </Modal>
) : null}
        </Container>
    )
}
export default Variants;