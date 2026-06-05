

import { ValidationError } from "../../utils/Error.js";

/**
 * DTO Class for updating variant
 * @class
 * @description This class normalizes and validates the entry for update variant
 */
export default class UpdateVariantDto {
    /**
     * 
     * @param {Object} rawData - داده های خام ورودی
     * @param {number} [rawData.product_id] - ایدی محصول
     * @param {string} [rawData.size] - سایز
     * @param {string} [rawData.color] - رنگ
     * @param {string} [rawData.quantity] - کمیت
     * @param {number} [rawData.width] - عرض
     * @param {number} [rawData.height] - ارتفاع
     * @param {number} [rawData.waist] - کمر
     * @param {string} [rawData.image_url] - ادرس عکس
     */
    constructor(rawData) {
        /**
         * @type {Set<string>} - فیلد های مجاز برای بروزرسانی
         */
        const allowedFields = new Set([
            'product_id', 'size', 'color', 'quantity',
            'width', 'height', 'waist', 'image_url'
        ]);
        /**
         * @type {Object.<string, any>}
         */
        const filteredData = {};
        for (const [key, value] of Object.entries(rawData)) {
            if (allowedFields.has(key) && value !== undefined && value !== null) {
                filteredData[key] = value
            }
        }
    }

    /**
     * دریافت داده های پالایش شده به صورت ابجکت
     * @function UpdateVariantDto#getCleanData
     * @returns {Object.<string, any>}
     * @instance
     * @memberof UpdateVariantDto
     */
    getCleanData() {
        return { ...this.filteredData }
    }
    /**
     * بررسی وجود یک فیلد برای بروزرسانی
     * @returns {boolean} true اگر حداقل یک فیلد برای بروزرسانی وجود داشته باشد
     * @example
     * const dto - new UpdateVariantDto({});
     * dto.hasAnyFieldToUpdate; // false
     */
    hasAnyFieldToUpdate() {
        return Object.keys(this.filteredData).length > 0
    }

    /**
     * اعتبار سنجی داده ها قبل از بروزرسانی
     * @param {Object} - داده های ورودی برای اعتبار سنجی
     * @throws {ValidationError} اگر داده خالی یا undefined باشد
     * @returns {void}
     * @static
     */
    static validateForUpdate(data) {
        if (!data || Object.keys(data).length === 0) {
            throw new ValidationError("At least one field is required for update")
        }
    }
}
