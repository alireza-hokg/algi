import multer from "multer";
import path from "path";
import { uploadsPath } from "../app.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// ✅ افزودن fileFilter برای اعتبارسنجی
// const fileFilter = (req, file, cb) => {
//     // فقط تصاویر
//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true);
//     } else {
//         cb(new Error('فقط فایل‌های تصویری مجاز هستند!'), false);
//     }
// };

const upload = multer({
    storage: storage,
    limits: { 
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 1 // فقط یک فایل
    },
    // fileFilter: fileFilter
});

export const upload_files = upload.single("product_image");