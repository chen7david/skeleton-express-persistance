const Joi = require('@hapi/joi')
const { CN_CELL_PHONE_REGEX } = require('./../config')
const phoneNumberRegex = CN_CELL_PHONE_REGEX || /^1[0-9]{10}$|^[569][0-9]{7}$/

// MAIN VALIDATORS

const validateBody = (schema)=>{
    return (req,res,next)=>{
        
        const result = Joi.validate(req.body, schema)
        if(result.error)
            return next(result.error)
            
        if(!req.this) {req.this = {}}
        req.this['body'] = result.value
        next()
    }
}

const validateHeader = (schema)=>{
    return (req,res,next)=>{
        const result = Joi.validate(req.header, schema)
        if(result.error)
            return next(result.error)

        if(!req.this) {req.this = {}}
        req.this['header'] = result.value
        next()
    }
}

// BODY SCHEMA VALIDATION 

const schema = {

    createUser: Joi.object().options({abortEarly:false}).keys({
        username: Joi.string().min(3).max(20).required().trim(),
        email: Joi.string().email().required().trim(),
        phoneNumber: Joi.string().regex(phoneNumberRegex).required().trim(),
        password: Joi.string().min(8).max(60).required(),
        passwordConfirm: Joi.any().valid(Joi.ref('password'))
    }),

    updateUser: Joi.object().options({abortEarly:false}).keys({
        email: Joi.string().email().trim(),
        phoneNumber: Joi.string().regex(CN_CELL_PHONE_REGEX).trim(),
    }),

}

module.exports = { validateBody, validateHeader, schema } 