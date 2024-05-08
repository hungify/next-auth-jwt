export type UnprocessableEntity<TField = unknown> = {
	property: string | (TField & Record<never, never>);
	message: string;
};

export class HttpError extends Error {
	error: string;
	statusCode: number;
	message: string;
	constructor({
		error,
		statusCode,
		message,
	}: {
		error: string;
		statusCode: number;
		message: string;
	}) {
		super(message);
		this.error = error;
		this.statusCode = statusCode;
		this.message = message;
	}
}

export class EntityError<TField = unknown> extends HttpError {
	payload: UnprocessableEntity<TField>[];
	constructor({ payload }: { payload: UnprocessableEntity<TField>[] }) {
		super({
			statusCode: 422,
			error: "Entity Error",
			message: "Unprocessable Entity",
		});
		this.payload = payload;
	}
}
