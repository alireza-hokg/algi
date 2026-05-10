import { Link } from "react-router-dom";
import Sylvanas from "../../assets/images/download.jpg";

const ProductItem = () => {
    return( 
        <li>
            <figure>
                <div className="mb-2 rounded-md overflow-hidden">
                    <img
                        className="w-full inline-block"
                        src={Sylvanas}/>
                </div>
                <div>
                    <figcaption>
                        <div className="space-y-4">
                            <div className="flex flex-col mx-4 space-y-1">
                                <h3 className="text-[#555]">ست پوما Q45406</h3>
                                <span className="font-bold text-sm">376,000 تومان</span>
                            </div>
                            <div>
                                <Link
                                    className="block text-center py-2 px-4 rounded-md bg-orange-500 text-white 
                                    scale-x-95 hover:scale-x-100 opacity-80 hover:opacity-100 transition-all duration-300"
                                    to={`/products/123`}>انتخاب گزینه ها
                                </Link>
                            </div>
                        </div>
                    </figcaption>
                </div>
            </figure>
        </li>
    )
}

export default ProductItem;