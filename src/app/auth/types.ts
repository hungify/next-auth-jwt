import type v from "valibot";
import type { authSchema } from "./schema";

export interface AuthOutput {
	loginBodyRequest: v.Output<(typeof authSchema)["loginBodyRequest"]>;
	registerBodyRequest: v.Output<(typeof authSchema)["registerBodyRequest"]>;
}

export type AuthPathname = "/auth/login" | "/auth/register" | "/auth/verify";
