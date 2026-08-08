import { useProductImage } from "../../hooks/useProductImage.js";

const CreateProductImage = ({ product }) => {
    
    const {
        file,
        fileText,
        setFileText,
        preview,
        loading,
        handleCreateProductImage,
        onChangeFile,
    } = useProductImage();

    return (
        <div className="flex-1 mb-4 flex flex-col gap-y-2 h-full">
            <div className="flex-1 flex items-center gap-x-2">
                <label>متن عکس</label>
                <input
                    className="outline-0 border py-1 px-2 rounded-md flex-1"
                    type="text"
                    value={fileText}
                    onChange={(e) => setFileText(e.target.value)}
                    placeholder="متن عکس را وارد کنید..."
                />
            </div>
            <div className="flex-1">
                <label
                    htmlFor="image"
                    className="block text-center cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white"
                >
                    یک عکس انتخاب کنید
                </label>
                <input
                    id="image"
                    className="hidden"
                    onChange={onChangeFile}
                    type="file"
                    accept="image/*" // فقط تصاویر
                />
            </div>
            <div className="flex-1">
                {/* نمایش نام فایل انتخاب‌شده */}
                {file && (
                    <div className="text-sm text-gray-600">
                        فایل انتخاب شده: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </div>
                )}
                
                {/* نمایش پیش‌نمایش */}
                {preview && (
                    <div className="mt-2">
                        <img 
                            src={preview} 
                            alt="پیش‌نمایش" 
                            className="max-w-[200px] max-h-[200px] object-cover rounded-md border"
                        />
                    </div>
                )}
            </div>
            
            <button
                onClick={()=> handleCreateProductImage(product?.id)}
                disabled={loading || !file}
                className={`py-2 px-4 bg-linear-to-r from-cyan-500 to-blue-500 rounded-md text-white 
                    cursor-pointer ${(loading || !file) && 'opacity-50 cursor-not-allowed'}`}
            >
                {loading ? "در حال آپلود..." : "افزودن عکس"}
            </button>
        </div>
    );
};

export default CreateProductImage;