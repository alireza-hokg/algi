// Accessibles phone numbers
const phoneRegex = new RegExp(/^(09|98)[0-9]{9}$/g);

// Normalize phone number
function normalizePhone(phone) {
    let cleanPhone = phone.toString().trim();
    // normalize phone number
    cleanPhone = cleanPhone;
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