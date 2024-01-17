import * as bcrypt from "bcrypt";

export class Bcrypt {
	static encryptPassword(myPlaintextPassword: string): Promise<string> {
		const saltRounds: number = 10;
		return new Promise<string>((resolve, reject) => {
			bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
				if (err) {
					reject(err);
				} else {
					resolve(hash);
				}
			});
		});
	}

	static comparePassword(myPlaintextPassword: string, myHashedPassword: string): Promise<boolean | Error> {
		return new Promise<boolean | Error>((resolve, reject) => {
			bcrypt.compare(myPlaintextPassword, myHashedPassword, (err, result) => {
				if (err) {
					reject(err);
				} else if (!result) {
					let error = new Error("Username and password doesn't match");
					(error as any).errorStatus = 401;
					resolve(error);
				} else {
					resolve(true);
				}
			});
		});
	}
}
