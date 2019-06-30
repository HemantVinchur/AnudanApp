const { Joi, celebrate } = require('celebrate');
const registerAdminValidator = celebrate({
    body: Joi.object().keys({
        Email: Joi.string().required(),
        Password: Joi.string().required()
    })
})

module.exports ={
    registerAdminValidator

}