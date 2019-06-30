const { Joi, celebrate } = require('celebrate');
const registerDoationValidator = celebrate({
    body: Joi.object().keys({
        donarName: Joi.string().required(),
        Email: Joi.string().required(),
        Contact: Joi.number().required(),
        Address: Joi.string().required(),
        Amount: Joi.number().required()
    })
})

module.exports ={
    registerDoationValidator

}