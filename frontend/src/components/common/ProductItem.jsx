import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const ProductItem = ({ product }) => {
    // console.log(product.Product_Images)
    return(
        <li>
            <figure className="h-full flex flex-col">
                <Link 
                    to={`/products/${product.slug}/variants`}
                    className="flex-1"
                >
                    <div className="mb-2 rounded-md overflow-hidden shadow-lg shadow-gray-400 h-full">
                        {product.Product_Images.length > 0 ? (
                            <img
                                className="w-full inline-block h-full"
                                src={`http://localhost:9000/uploads/${product.Product_Images.find(image => {
                                    console.log(image)
                                    if (image.is_main) {
                                        return true
                                    }
                                })?.image_url}`}
                            />
                        ) : null}
                    </div>
                </Link>
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
                                to={`/products/${product.slug}/variants`}
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