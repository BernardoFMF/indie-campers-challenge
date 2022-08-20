import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
	const status = err.status
	res.status(status || 500)
	res.json({ message : err.message })
}

export type Error = {
    message: string,
    status: number
}

export default errorHandler