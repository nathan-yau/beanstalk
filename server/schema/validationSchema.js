const Joi = require("joi");

// Create a signup schema
const validationSchema = Joi.object(
    {
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "org", "ca"] } }).messages({
            'string.email': 'Valid email address required.',
            'string.empty': 'Email address cannot be empty.',
        }),
        username: Joi.string().alphanum().max(20).messages({
            'string.alphanum': 'Must only contain alphanumeric characters',
            'string.max': 'Must be less than 20 characters',
            'string.empty': 'Please enter a valid username',
        }),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).min(8).max(20).messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. (@$!%*?&)',
            'string.min': 'Minimum password length is 8 characters',
            'string.empty': 'Please enter a valid password',
            'string.max': 'Password must be less than 20 characters',
        }),
        confirmPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/).min(8).max(20).messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. (@$!%*?&)',
            'string.min': 'Minimum password length is 8 characters',
            'string.empty': 'Please enter a valid password',
            'string.max': 'Password must be less than 20 characters',
        })
    });

// Export the schema
module.exports = validationSchema;