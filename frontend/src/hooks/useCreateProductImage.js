import { toast } from "react-hot-toast";

import { useEffect, useState } from "react";

import { post } from "../services/api.js";

export const useCreateProductImage = () => {
    const [file, setFile] = useState(null);
    const [fileText, setFileText] = useState("");
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChangeFile = (e) => {
        const selectedFile = e.target.files?.[0];
        
        if (selectedFile) {
            setFile(selectedFile); // ✅ اصلاح شد

            // نمایش پیش‌نمایش (اختیاری)
            const previewUrl = URL.createObjectURL(selectedFile);
            setPreview(previewUrl);
            
            // پاک کردن مقدار input بعد از آپلود (اختیاری)
            e.target.value = '';
        }
    };

    const handleCreateProductImage = async (product_id) => {
        if (!file) {
            alert("لطفاً ابتدا یک فایل انتخاب کنید!");
            return;
        }
        
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('product_image', file);
            formData.append('image_text', fileText);
            formData.append('product_id', product_id)
            // ارسال به سرور
            const { data } = await post("/product-images", formData);
            console.log(data)
            if (data.success) {
                // ریست کردن فرم بعد از آپلود موفق
                setFile(null);
                setFileText("");
                setPreview(null);
                toast.success("عکس با موفقیت اپلود شد.", {
                    duration: 2000,
                    position: "top-center"
                })
                return data;
            }
            
        } catch (err) {
            console.error("خطا در آپلود عکس:", err.message);
            toast.error(`خطا در اپلود عکس ${err.message}`, {
                position: "top-center",
                duration: 2000
            })
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