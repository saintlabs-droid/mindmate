/**
 * Validators Utility
 * Input validation and sanitization functions.
 */

export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
};

export const validateEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone) => {
    if (!phone || typeof phone !== 'string') return false;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
};

export const validateRequired = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
};

export const validateMinLength = (value, min) => {
    if (typeof value !== 'string') return false;
    return value.length >= min;
};

export const validateMaxLength = (value, max) => {
    if (typeof value !== 'string') return false;
    return value.length <= max;
};
