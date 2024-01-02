import { body, param, query } from "express-validator";

export class UserValidator {
	static signupValidator() {
		return [
			body("name", "name is required").isString(),
			body("email", "Email is required").isEmail(),
			body("password", "Password is required")
				.isAlphanumeric()
				.isLength({ min: 8, max: 32 })
				.withMessage("Password must be between 8-32 characters"),
			body("phone", "Phone number is required").isString().optional(),
			body("type", "User type is required").isString().optional(),
			body("date_of_birth", "Date of birth is required").isDate().optional(),
			body("gender", "Gender is required").isString().optional(),
		];
	}

	static verifyEmailValidator() {
		return [
			body("email", "Email is required").isEmail(),
			body("email_verification_token", "Token is required")
				.isString()
				.isLength({ min: 6, max: 6 })
				.withMessage("OTP must be have 6 digits"),
		];
	}

	static resendVerificationTokenValidator() {
		return [body("email", "Email is required").isEmail()];
	}

	static loginValidator() {
		return [
			body("email", "Email is required").isEmail(),
			body("password", "Password is required").isAlphanumeric(),
		];
	}

	static forgotPasswordValidator() {
        return [body("email", "Email is required").isEmail()];
    }

    static resetPasswordValidator() {
        return [
            body("email", "Email is required").isEmail(),
            body("password_reset_token", "Password reset OTP is required").isString(),
        ];
    }

	static getProfileValidator() {
		return [param("email", "Email is required").isEmail()];
	}

	static updateProfileValidator() {
        return [
            body("email", "Email is required").isEmail(),
            body("name").optional().isString(),
            body("phone").optional().isString(),
            body("type").optional().isString(),
        ];
    }
}
