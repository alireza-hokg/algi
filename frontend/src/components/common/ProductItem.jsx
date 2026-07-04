import { Link } from "react-router-dom";
import Sylvanas from "../../assets/images/download.jpg";

const ProductItem = ({ product }) => {
    
    return( 
        <li>
            <figure>
                <Link to={`/products/${product.slug}/variants`}>
                    <div className="mb-2 rounded-md overflow-hidden shadow-lg shadow-gray-400">
                        <img
                            className="w-full inline-block"
                            src={Sylvanas}/>
                    </div>
                </Link>
                <div>
                    <figcaption>
                        <div className="space-y-4">
                            <div className="flex flex-col mx-4 space-y-1 items-center">
                                <h3 className="text-[#555]">ست پوما Q45406</h3>
                                <div className="space-x-1">
                                    <span className="text-sm line-through decoration-1 decoration-gray-500
                                    text-gray-500">{(376000).toLocaleString("fa-IR")}</span>{" "}
                                    <span className="text-amber-500 font-extrabold">{(300000).toLocaleString("fa-IR")} تومان</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <Link
                                    className=""
                                    to={`/products/${product.slug}/variants`}>انتخاب گزینه ها
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