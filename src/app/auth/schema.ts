import * as v from "valibot";

export const authSchema = {
	loginBodyRequest: v.object({
		email: v.string([v.email()]),
		password: v.string([v.minLength(8)]),
	}),

	registerBodyRequest: v.object({
		fullName: v.string([v.minLength(3)]),
		email: v.string([v.email()]),
		password: v.string([v.minLength(8)]),
	}),
};
