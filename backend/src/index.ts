import dotenv from "dotenv";
import { Server } from "./server";

dotenv.config();
const port = process.env.PORT || 3000;

const server = new Server();
server.app.listen(3000,()=>{
	console.log(`server running at port ${port}`)
})