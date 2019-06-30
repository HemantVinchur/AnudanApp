const { Joi, celebrate } = require('celebrate');
const registerReqValidator = celebrate({
    body: Joi.object().keys({
        Name: Joi.string().required(),
        Email: Joi.string().required(),
        Password: Joi.string().required(),
        Contact: Joi.number().required(),
        Address: Joi.string().required(),
    })
})

module.exports ={
     registerReqValidator

}