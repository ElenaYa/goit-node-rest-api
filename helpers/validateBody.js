import HttpError from "./HttpError.js";

const validateBody = (schema) => {
    const func = (req, res, next) => {
        const {error} = validateBody(req.body, schema);

        if(error) {
            next(HttpError(400, error.message));
        }
        next();
    };
    return func;
};
export default validateBody;