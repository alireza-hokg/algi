import { useEffect, useState } from "react";
import { post } from "../services/api.js";

export const useProductImage = () => {
    const [file, setFile] = useState(null);
    const [fileText, setFileText] = useState("");
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChangeFile = (e) => {
        const selectedFile = e.target.files?.[0];
        console.log("فایل انتخاب شد:", selectedFile);
        
        if (selectedFile) {
            setFile(selectedFile); // ✅ اصلاح شد

            // نمایش پیش‌نمایش (اختیاری)
            const previewUrl = URL.createObjectURL(selectedFile);
            setPreview(previewUrl);
            
            // پاک کردن مقدار input بعد از آپلود (اختیاری)
            e.target.value = '';
        }
    };

    const handleCreateProductImage = async (productId) => {
        if (!file) {
            alert("لطفاً ابتدا یک فایل انتخاب کنید!");
            return;
        }
        
        setLoading(true);
        
        try {
            const formData = new FormData();
            formData.append('product_image', file);
            formData.append('image_text', fileText);
            formData.append('product_id', productId)

            // ارسال به سرور
            const createdProductImage = await post("/product-images", formData);
            
            // ریست کردن فرم بعد از آپلود موفق
            setFile(null);
            setFileText("");
            setPreview(null);
            
            return createdProductImage;
            
        } catch (err) {
            console.error("خطا در آپلود عکس:", err.message);
            alert("خطا در آپلود عکس: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=> {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        }
    }, [preview])

    return {
        file,
        fileText,
        setFileText,
        preview,
        loading,
        handleCreateProductImage,
        onChangeFile,
    };
};