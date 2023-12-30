import { validationResult } from "express-validator";

export class GlobalMiddleware {
	static checkValidationError(req, res, next) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// only send one error to make error msg simple
			next(new Error(errors.array()[0].msg));
		} else {
			next();
		}
	}
}
