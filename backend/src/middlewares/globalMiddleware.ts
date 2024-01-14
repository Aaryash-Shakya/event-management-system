import { validationResult } from "express-validator";
import { Jwt } from "../services/jwt";
import { Service } from "../services/utils";

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

	static async authorization(req, res, next) {
		const header_auth = req.headers.authorization;
		// bearer <token>
		const token = header_auth ? header_auth.slice(7) : null;
		// alternative
		// const token = header_auth.split(' ')[1]
		try {
			const decoded = await Jwt.verifyJwt(token);
			req.body.decoded = decoded;
			next();
		} catch (err) {
			next(err);
		}
	}

	// note authorization must be called before this
	static checkTypeAdmin(req, res, next) {
		const userType = req.body.decoded.type;
		try {
			if (userType !== "admin") {
				Service.createErrorAndThrow("Unauthorized user", 401);
			}
			next();
		} catch (err) {
			next(err);
		}
	}
}
