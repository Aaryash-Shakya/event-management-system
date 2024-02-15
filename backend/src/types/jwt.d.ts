import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
	userId: number;
	email: string;
	type: "user" | "admin";
	purpose: "login" | "reset-password" | "delete-user";
}
