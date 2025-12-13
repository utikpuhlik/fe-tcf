import { fetchEntityById } from "@/lib/api/generic/fetchEntity";
import { type UserSchema, zUserSchema } from "@/lib/schemas/userSchema";

const ENTITY = "users";

export const usersApi = {
	fetchById(id: string): Promise<UserSchema> {
		return fetchEntityById<UserSchema>(id, zUserSchema, ENTITY, true);
	},
};
