import Joi from '@hapi/joi';
import { validPassword } from './validationUtils';

const firstName = Joi.string().min(2).max(128).trim().required();
const lastName = Joi.string().min(2).max(128).trim().required();
const email = Joi.string().email().min(8).max(254).lowercase().trim().required();
const password = Joi.string().min(8).max(72, 'utf8').required().custom(validPassword, 'validPassword');
const passwordConfirmation = Joi.valid(Joi.ref('Password')).required().label('PasswordConfirmation').messages({ 'any.only': '{{#label}} does not match' });

export const registerValidation = (data) => {
    const schema = Joi.object({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        PasswordConfirmation: passwordConfirmation
    });

    return schema.validate(data, { abortEarly: false });
};

export const loginValidation = (data) => {
    const schema = Joi.object({
        Email: email,
        Password: password,
    });

    return schema.validate(data, { abortEarly: false });
};