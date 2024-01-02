import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";
import { TokenController } from "../controllers/tokenController";

class TokenRoute {
	public router: Router;

	constructor() {
		this.router = Router();
		this.getRoutes();
		this.postRoutes();
		this.patchRoutes();
		this.putRoutes();
		this.deleteRoutes();
	}

	getRoutes() {
		this.router.get("/get-tokens", TokenController.getTokens);
	}

	postRoutes() {
		this.router.post("/create-token", TokenController.createToken);
	}
	patchRoutes() {}
	putRoutes() {}
	deleteRoutes() {}
}

export default new TokenRoute().router;
