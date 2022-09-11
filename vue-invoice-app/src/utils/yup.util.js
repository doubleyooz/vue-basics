import * as yup from 'yup';

export const rules = {
    street: yup.string().min(10).max(20),
    city: yup.string().min(3).max(23),
    zipCode: yup.string().matches(/^\d{5}(?:[-\s]\d{4})?$/),
    country: yup.string().min(3).max(23),
    name: yup.string().min(3).max(14),
    email: yup.string().email(),
    description: yup.string().min(3).max(30),
    quantity: yup.number().positive(),
    price: yup.string(),
    date: yup.date()
};
