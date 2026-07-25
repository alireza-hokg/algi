/**
 * 
 * @description
 * PhoneNumber must be Iran phoneNumber and starts with 09
 */
const phoneRegex = new RegExp(/^09\d{9}$/);

/**
 * @param {string} phone - phoneNumber for authenticate user
 * @returns {string}
 * 
 * @description
 * Normalize the phone, we can type phoneNumber in two ways but we only need one way
 * If starts with 98 replace the 98 to 0 
 * trim the spaces and return a phone starts with 0
 * 
 * @example
 * 989371036096 => 09371036096 // Replace the 98 with 0
 */
function normalizePhone(phone) {
    let cleanPhone = phone.toString().trim();
    // normalize phone number
    if (cleanPhone.startsWith("98")) {
        cleanPhone = "0" + cleanPhone.slice(2);
    }
    return cleanPhone;
}
/**
 * 
 * @param {string} phone - Authenticate user to be Iran phoneNumber
 * @returns {boolean} true if valid, false if invalid
 * 
 * @description
 * Tests the phoneNumber with Regex for just Iran numbers started with 09 and be 11 digits
 * If accepts the phoneNumber returns true
 * If rejects the phoneNumber returns false
 */
function isValidPhone(phone) {
    if (typeof phone === "null" || typeof phone === "undefined" || typeof phone === "object") {
        return false
    }
    try {
        let normalize = normalizePhone(phone);
        return phoneRegex.test(normalize);
    } catch(err) {
        return false
    }
}
export { normalizePhone, isValidPhone, phoneRegex }