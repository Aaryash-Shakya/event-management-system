/* eslint-disable @typescript-eslint/no-explicit-any */
interface SuccessResponse {
	status: 200;
	message: string;
	[key: string]: any;
}

interface ErrorResponse {
    status: number;
	errorName: string;
	errorMessage: string;
	[key: string]: any;
}

export type SuccessOrError = {
	status: number;
} & (SuccessResponse | ErrorResponse);

// ! ask how to make sure that it is one of the two types

// const x: SuccessOrError = {
//     status: 200,
// 	message: "Success",
//     errorMessage: 'asdf'
// };
// console.log(x);
