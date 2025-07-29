import { ZodType } from "zod";
export const validateBody = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        console.error("Zod validation error:", result.error.issues);
        return res.status(400).json({ error: result.error.issues });
    }
    req.body = result.data;
    next();
};
export const validateQuery = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
        console.error("Zod validation error:", result.error.issues);
        return res.status(400).json({ error: result.error.issues });
    }
    req.query = result.data;
    next();
};
