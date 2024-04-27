import { toast } from 'react-toastify';

export const validatePassword = (password) => {
    if (password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        toast.error("Password must contain at least one uppercase letter");
        return false;
    }

    if (!/[a-z]/.test(password)) {
        toast.error("Password must contain at least one lowercase letter");
        return false;
    }

    if (!/\d/.test(password)) {
        toast.error("Password must contain at least one digit");
        return false;
    }

    const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    if (!specialChars.test(password)) {
        toast.error("Password must contain at least one special character");
        return false;
    }

    return true;
};
