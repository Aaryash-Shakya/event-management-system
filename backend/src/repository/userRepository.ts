import { db } from "../models";

export async function findAll() {
	return await db.UserModel.findAll();
}

export async function createUser(){
    
}
