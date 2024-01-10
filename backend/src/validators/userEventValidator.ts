import {body, param} from "express-validator";

export class UserEventValidator {
    static joinEventValidator() {
        return [
            body("user_id", "User ID is required").isNumeric(),
            body("event_id", "Event ID is required").isNumeric(),
        ];
    }
}