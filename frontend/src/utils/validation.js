const checkValidity = (value, rules) => {
    if (!rules) return;
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.minLength && isValid
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
        const pattern = /\d+/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isPassword) {
        const pattern = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;
}

export default checkValidity;


// This password regex will enforce these rules:

// At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)