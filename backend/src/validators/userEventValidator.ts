import {body, param} from "express-validator";

export class UserEventValidator {
    static getParticipantsByEventValidator() {
        return [
            body("event_id", "Event ID is required").isNumeric(),
            body("status", "Status is required").isString().optional(),
        ];
    }

    static getEventsByParticipantValidator() {
        return [
            body("user_id", "User ID is required").isNumeric(),
            body("status", "Status is required").isString().optional(),
        ];
    }
    
    static joinEventValidator() {
        return [
            body("user_id", "User ID is required").isNumeric(),
            body("event_id", "Event ID is required").isNumeric(),
        ];
    }

    static leaveEventValidator() {
        return [
            body("user_id", "User ID is required").isNumeric(),
            body("event_id", "Event ID is required").isNumeric(),
        ];
    }
}