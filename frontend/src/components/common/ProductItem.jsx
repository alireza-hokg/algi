import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const ProductItem = ({ product }) => {
    const imageIdx = product?.Product_Images.findIndex(image => {
        return image.is_main
    })

    const image = imageIdx > 0 ? 
        product?.Product_Images.find(image => image.is_main) :
        product?.Product_Images[0]

    return(
        <li className="pb-4 rounded-md shadow-sm overflow-hidden">
            <figure className="h-full flex flex-col gap-y-12">
            
                {/* IMAGE */}
                <div className="overflow-hidden h-70">
                    {product.Product_Images.length > 0 ? (
                        <Link
                            to={`/products/slug/${product.slug}`}
                            className="flex-1"
                        >
                            <img
                                className="w-full inline-block h-full hover:scale-110 transition duration-300
                                object-cover"
                                src={`http://localhost:9000/uploads/${image?.image_url}`}
                            />
                        </Link>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <Link
                                className="bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-md
                                text-white"
                                to={`/products/${product?.id}/images`}
                            >
                                ساخت عکس
                            </Link>
                        </div>
                    )}
                </div>
                <figcaption>
                    <div className="space-y-4">
                        <div className="flex flex-col mx-4 space-y-1 items-center">
                            <h3 className="text-[#555]">{product.name}</h3>
                            <div className="space-x-1">
                                <span className="text-sm line-through decoration-1 decoration-gray-500
                                text-gray-500">{(376000).toLocaleString("fa-IR")}</span>{" "}
                                <span className="text-amber-500 font-extrabold">{(product.price).toLocaleString("fa-IR")} تومان</span>
                            </div>
                        </div>
                        <div className="table mx-auto text-center mt-4">
                            <Link
                                className="inline-block relative bg-lime-500 py-2 px-6 rounded-lg text-white group overflow-hidden"
                                to={`/products/slug/${product.slug}`}
                            >
                                <span className="inline-block group-hover:-translate-y-20 duration-300">انتخاب گزینه ها</span>
                                <ShoppingCart
                                    className="absolute top-0 bottom-0 left-0 right-0 m-auto translate-y-20
                                    group-hover:translate-y-0 duration-300"
                                />
                            </Link>
                        </div>
                    </div>
                </figcaption>
            </figure>
        </li>
    )
}

export default ProductItem;