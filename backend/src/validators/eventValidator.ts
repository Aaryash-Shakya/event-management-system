import {body, param} from "express-validator";

export class EventValidator {
    static addEventValidator() {
        return [
            body("title", "Title is required").isString(),
            body("description", "Description is required").isString(),
            body("status", "Status is required").isString(),
            body("maximum_participants", "Maximum participants is required").isNumeric(),
            body("gathering_point", "Gathering point is required").isString(),
            body("destination", "Destination is required").isString(),
            body("start_date", "Start date is required").isString(),
            body("duration", "Duration is required").isString(),
            body("difficulty", "Difficulty is required").isString(),
        ];
    }

    static getEventValidator() {
        return [param("event_id", "Event ID is required").isNumeric()];
    }

    static updateEventValidator() {
        return [
            param("event_id", "Event ID is required").isNumeric(),
            body("title").isString().optional(),
            body("description").isString().optional(),
            body("status").isString().optional(),
            body("maximum_participants").isNumeric().optional(),
            body("gathering_point").isString().optional(),
            body("destination").isString().optional(),
            body("start_date").isString().optional(),
            body("duration").isString().optional(),
            body("difficulty").isString().optional(),
        ];
    }
}