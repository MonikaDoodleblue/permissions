import Joi from "joi";
import { statusCode } from "../validation/status";

const registerSchema = (req: any, res: any, next: any) => {
    const schema = Joi.object({
        user_name: Joi.string().required().label("User Name"),
        email: Joi.string().required().label("Email ID"),
        password: Joi.string().pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{4,}$')).required().label("Password"),
        role: Joi.string().valid('admin', 'user').required().label("Role")
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(statusCode.badRequest).json({ message: error.details[0].message });
    }
    next();
};

const groupSchema = (req: any, res: any, next: any) => {
    const schema = Joi.object({
        group_name: Joi.string().required().label("Group Name"),
        description: Joi.string().required().label("Description"),
        user_id: Joi.number().required().label("User ID"),
        mainModule_id: Joi.number().required().label("Main Module ID"),
        permission: Joi.array()
            .items(
                Joi.object({
                    subModule_id: Joi.number().required().label("Submodule ID"),
                    all: Joi.boolean().required(),
                    create: Joi.boolean().required(),
                    view: Joi.boolean().required(),
                    canUpdate: Joi.boolean().required(),
                    delete: Joi.boolean().required(),
                })
            )
            .required()
            .label("Permission"),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(statusCode.badRequest).json({ message: error.details[0].message });
    }
    next();
};

export { registerSchema, groupSchema };