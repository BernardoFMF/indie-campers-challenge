import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const status = err.status_code
	res.status(status || 500)
	res.json({ message : err.message || "Internal server error" })
}

export class StatusError extends Error {
    status_code: number;

    constructor(status_code: number, message: string) {
        super(message);
        this.status_code = status_code;
    }
}

export default errorHandler