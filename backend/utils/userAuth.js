// Accessibles phone numbers
const phoneRegex = new RegExp(/^09\d{9}$/);

// Normalize phone number
function normalizePhone(phone) {
    let cleanPhone = phone.toString().trim();
    // normalize phone number
    if (cleanPhone.startsWith("98")) {
        cleanPhone = "0" + cleanPhone.slice(2);
    }
    return cleanPhone;
}
// Validation (returns true/false)
function isValidPhone(phone) {
    try {
        let normalize = normalizePhone(phone);
        return phoneRegex.test(normalize);
    } catch(err) {
        return false
    }
}
export { normalizePhone, isValidPhone, phoneRegex }