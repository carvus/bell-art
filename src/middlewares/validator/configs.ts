import Joi from "joi";

const requestValidations: {
    [key: string]: Joi.ObjectSchema
} = {
    send_mail: Joi.object({
        files: {},
        fields: {
            mail: Joi.string().email().required(),
            message: Joi.string().required()
        }
    })
}


export default requestValidations;
