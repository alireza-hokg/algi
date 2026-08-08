import { useState } from "react";

const ProductImages = ({ product_images = [] }) => {
    const mainImage = product_images.find(image => image.is_main) || product_images[0]
    const [selectedImage, setSelectedImage] = useState(
        product_images.findIndex(image => image.is_main) >= 0
            ? product_images.findIndex(image => image.is_main)
            : 0
    );
    const image = product_images[selectedImage] || mainImage;

    return (
        <div className="lg:w-1/2 lg:relative">
            <div className="lg:sticky lg:top-8">
                <div className="bg-gray-100 rounded-2xl overflow-hidden group max-h-8/12">
                    <img
                        src={`http://localhost:9000/uploads/${image?.image_url}`}
                        alt={image?.image_text}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                {/* Thumbnails - اگر چندتا تصویر داری */}
                <div className="flex gap-2 mt-4">
                    {product_images?.map((img, idx) => (
                        <div 
                            key={idx} 
                            onClick={()=> {
                                setSelectedImage(idx)
                            }}
                            className="w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent
                            hover:border-amber-500 transition-all cursor-pointer">
                            <img 
                                src={`http://localhost:9000/uploads/${img.image_url}`}
                                alt={img.image_text} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ProductImages;