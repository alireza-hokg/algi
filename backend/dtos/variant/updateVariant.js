// allowedFields
// filteredData
// getCleanData
// hasUpdatableFields

import { ValidationError } from "../../utils/Error.js";

export default class UpdateVariantDto {
    constructor(rawData) {
        // Allowed Fields
        const allowedFields = new Set([
            'product_id', 'size', 'color', 'quantity',
            'width', 'height', 'waist', 'image_url'
        ]);
        const filteredData = {};
        for (const [key, value] of Object.entries(rawData)) {
            if (allowedFields.has(key) && value !== undefined && value !== null) {
                filteredData[key] = value
            }
        }
    }

    getCleanData() {
        return { ...this.filteredData }
    }

    hasAnyFieldToUpdate() {
        return Object.keys(this.filteredData).length > 0
    }

    static validateForUpdate(data) {
        if (!data || Object.keys(data).length === 0) {
            throw new ValidationError("At least one field is required for update")
        }
    }
}
