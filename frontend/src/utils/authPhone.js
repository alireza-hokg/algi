const phoneRegex = new RegExp(/^09\d{9}$/);

function isValidPhone(phone) {
    if (phoneRegex.test(phone)) {
        return true
    }
    return false
}

export { isValidPhone }