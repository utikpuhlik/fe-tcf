import {
	bigint,
	boolean,
	foreignKey,
	index,
	integer,
	json,
	numeric,
	pgTable,
	primaryKey,
	text,
	timestamp,
	unique,
	uniqueIndex,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const alembicVersion = pgTable("alembic_version", {
	versionNum: varchar("version_num", { length: 32 }).primaryKey().notNull(),
});

export const jwks = pgTable("jwks", {
	id: varchar().primaryKey().notNull(),
	publicKey: varchar("public_key").notNull(),
	privateKey: varchar("private_key").notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: "string" }),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "string",
	}).defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		mode: "string",
	}).defaultNow(),
});

export const verification = pgTable(
	"verification",
	{
		id: varchar().primaryKey().notNull(),
		identifier: varchar().notNull(),
		value: varchar().notNull(),
		expiresAt: timestamp("expires_at", {
			withTimezone: true,
			mode: "string",
		}).notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		index("verification_identifier_idx").using(
			"btree",
			table.identifier.asc().nullsLast().op("text_ops"),
		),
	],
);

export const user = pgTable(
	"user",
	{
		id: varchar().primaryKey().notNull(),
		name: varchar().notNull(),
		email: varchar().notNull(),
		emailVerified: boolean("email_verified").notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [unique("uq_user_email").on(table.email)],
);

export const account = pgTable(
	"account",
	{
		id: varchar().primaryKey().notNull(),
		accountId: varchar("account_id").notNull(),
		providerId: varchar("provider_id").notNull(),
		userId: varchar("user_id").notNull(),
		accessToken: varchar("access_token"),
		refreshToken: varchar("refresh_token"),
		idToken: varchar("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at", {
			withTimezone: true,
			mode: "string",
		}),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
			withTimezone: true,
			mode: "string",
		}),
		scope: varchar(),
		password: varchar(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		index("account_userId_idx").using(
			"btree",
			table.userId.asc().nullsLast().op("text_ops"),
		),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "fk_account_user_id_user",
		}).onDelete("cascade"),
	],
);

export const session = pgTable(
	"session",
	{
		id: varchar().primaryKey().notNull(),
		expiresAt: timestamp("expires_at", {
			withTimezone: true,
			mode: "string",
		}).notNull(),
		token: varchar().notNull(),
		ipAddress: varchar("ip_address"),
		userAgent: varchar("user_agent"),
		userId: varchar("user_id").notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		index("session_userId_idx").using(
			"btree",
			table.userId.asc().nullsLast().op("text_ops"),
		),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "fk_session_user_id_user",
		}).onDelete("cascade"),
		unique("uq_session_token").on(table.token),
	],
);

export const addresses = pgTable(
	"addresses",
	{
		id: uuid().primaryKey().notNull(),
		userId: uuid("user_id").notNull(),
		firstName: varchar("first_name").notNull(),
		lastName: varchar("last_name").notNull(),
		phone: varchar(),
		city: varchar().notNull(),
		street: varchar().notNull(),
		postalCode: varchar("postal_code").notNull(),
		shippingMethod: varchar("shipping_method", { length: 11 }).notNull(),
		shippingCompany: varchar("shipping_company"),
		isDefault: boolean("is_default").notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_addresses_user_id_users",
		}),
	],
);

export const auditLog = pgTable(
	"audit_log",
	{
		id: uuid().primaryKey().notNull(),
		userId: uuid("user_id").notNull(),
		method: varchar(),
		endpoint: varchar(),
		payload: json(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_audit_log_user_id_users",
		}),
	],
);

export const carts = pgTable(
	"carts",
	{
		id: uuid().primaryKey().notNull(),
		userId: uuid("user_id").notNull(),
		status: varchar({ length: 9 }).notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_carts_user_id_users",
		}),
	],
);

export const categories = pgTable(
	"categories",
	{
		id: uuid().primaryKey().notNull(),
		name: varchar().notNull(),
		slug: varchar().notNull(),
		imageUrl: varchar("image_url"),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		unique("uq_categories_name").on(table.name),
		unique("categories_slug_key").on(table.slug),
	],
);

export const subCategories = pgTable(
	"sub_categories",
	{
		id: uuid().primaryKey().notNull(),
		name: varchar().notNull(),
		slug: varchar().notNull(),
		imageUrl: varchar("image_url"),
		categoryId: uuid("category_id").notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "fk_sub_categories_category_id_categories",
		}),
		unique("sub_categories_slug_key").on(table.slug),
	],
);

export const orders = pgTable(
	"orders",
	{
		id: uuid().primaryKey().notNull(),
		userId: uuid("user_id").notNull(),
		addressId: uuid("address_id").notNull(),
		status: varchar({ length: 20 }).notNull(),
		note: varchar(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		foreignKey({
			columns: [table.addressId],
			foreignColumns: [addresses.id],
			name: "fk_orders_address_id_addresses",
		}),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_orders_user_id_users",
		}),
	],
);

export const products = pgTable(
	"products",
	{
		id: uuid().primaryKey().notNull(),
		bitrixId: varchar("bitrix_id"),
		subCategoryId: uuid("sub_category_id").notNull(),
		name: varchar().notNull(),
		slug: varchar().notNull(),
		crossNumber: varchar("cross_number"),
		imageUrl: varchar("image_url"),
		isDeleted: boolean("is_deleted").notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		foreignKey({
			columns: [table.subCategoryId],
			foreignColumns: [subCategories.id],
			name: "fk_products_sub_category_id_sub_categories",
		}),
		unique("products_slug_key").on(table.slug),
	],
);

export const offers = pgTable(
	"offers",
	{
		id: uuid().primaryKey().notNull(),
		sku: varchar(),
		productId: uuid("product_id").notNull(),
		offerBitrixId: varchar("offer_bitrix_id"),
		brand: varchar().notNull(),
		manufacturerNumber: varchar("manufacturer_number").notNull(),
		internalDescription: text("internal_description"),
		imageUrl: varchar("image_url"),
		priceRub: numeric("price_rub", { precision: 12, scale: 4 }).notNull(),
		superWholesalePriceRub: numeric("super_wholesale_price_rub", {
			precision: 12,
			scale: 4,
		}).notNull(),
		quantity: integer().notNull(),
		isDeleted: boolean("is_deleted").notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "fk_offers_product_id_products",
		}),
	],
);

export const waybills = pgTable(
	"waybills",
	{
		id: uuid().primaryKey().notNull(),
		authorId: uuid("author_id").notNull(),
		customerId: uuid("customer_id").notNull(),
		orderId: uuid("order_id"),
		waybillType: varchar("waybill_type", { length: 14 }).notNull(),
		isPending: boolean("is_pending").notNull(),
		note: varchar(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		uniqueIndex("ix_waybills_order_id").using(
			"btree",
			table.orderId.asc().nullsLast().op("uuid_ops"),
		),
		foreignKey({
			columns: [table.authorId],
			foreignColumns: [users.id],
			name: "fk_waybills_author_id_users",
		}),
		foreignKey({
			columns: [table.customerId],
			foreignColumns: [users.id],
			name: "fk_waybills_customer_id_users",
		}),
		foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "fk_waybills_order_id_orders",
		}),
	],
);

export const cartOffers = pgTable(
	"cart_offers",
	{
		id: uuid().primaryKey().notNull(),
		cartId: uuid("cart_id").notNull(),
		offerId: uuid("offer_id").notNull(),
		quantity: integer().notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		foreignKey({
			columns: [table.cartId],
			foreignColumns: [carts.id],
			name: "fk_cart_offers_cart_id_carts",
		}),
		foreignKey({
			columns: [table.offerId],
			foreignColumns: [offers.id],
			name: "fk_cart_offers_offer_id_offers",
		}),
	],
);

export const waybillOffers = pgTable(
	"waybill_offers",
	{
		id: uuid().primaryKey().notNull(),
		waybillId: uuid("waybill_id").notNull(),
		offerId: uuid("offer_id").notNull(),
		quantity: integer().notNull(),
		brand: varchar().notNull(),
		manufacturerNumber: varchar("manufacturer_number"),
		priceRub: numeric("price_rub", { precision: 12, scale: 4 }).notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		foreignKey({
			columns: [table.offerId],
			foreignColumns: [offers.id],
			name: "fk_waybill_offers_offer_id_offers",
		}),
		foreignKey({
			columns: [table.waybillId],
			foreignColumns: [waybills.id],
			name: "fk_waybill_offers_waybill_id_waybills",
		}),
	],
);

export const userBalanceHistory = pgTable(
	"user_balance_history",
	{
		id: uuid().primaryKey().notNull(),
		userId: uuid("user_id").notNull(),
		waybillId: uuid("waybill_id"),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		delta: bigint({ mode: "number" }).notNull(),
		currency: varchar({ length: 3 }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		balanceBefore: bigint("balance_before", { mode: "number" }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		balanceAfter: bigint("balance_after", { mode: "number" }).notNull(),
		reason: varchar().notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_user_balance_history_user_id_users",
		}),
		foreignKey({
			columns: [table.waybillId],
			foreignColumns: [waybills.id],
			name: "fk_user_balance_history_waybill_id_waybills",
		}),
	],
);

export const users = pgTable(
	"users",
	{
		id: uuid().primaryKey().notNull(),
		clerkId: varchar("clerk_id"),
		email: varchar().notNull(),
		firstName: varchar("first_name").notNull(),
		lastName: varchar("last_name").notNull(),
		isActive: boolean("is_active").notNull(),
		role: varchar({ length: 8 }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		balanceRub: bigint("balance_rub", { mode: "number" }).notNull(),
		customerType: varchar("customer_type", { length: 20 }).notNull(),
		mailing: boolean().notNull(),
		phone: varchar(),
		city: varchar(),
		note: varchar(),
		shippingMethod: varchar("shipping_method", { length: 11 }),
		shippingCompany: varchar("shipping_company"),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		balanceUsd: bigint("balance_usd", { mode: "number" }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		balanceEur: bigint("balance_eur", { mode: "number" }).notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		balanceTry: bigint("balance_try", { mode: "number" }).notNull(),
		authUserId: varchar("auth_user_id"),
	},
	(table) => [
		foreignKey({
			columns: [table.authUserId],
			foreignColumns: [user.id],
			name: "fk_users_auth_user_id_user",
		}),
		unique("uq_users_clerk_id").on(table.clerkId),
		unique("uq_users_email").on(table.email),
	],
);

export const orderOffers = pgTable(
	"order_offers",
	{
		id: uuid().notNull(),
		orderId: uuid("order_id").notNull(),
		offerId: uuid("offer_id").notNull(),
		quantity: integer().notNull(),
		brand: varchar().notNull(),
		manufacturerNumber: varchar("manufacturer_number"),
		priceRub: numeric("price_rub", { precision: 12, scale: 4 }).notNull(),
		createdAt: timestamp("created_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
		updatedAt: timestamp("updated_at", {
			withTimezone: true,
			mode: "string",
		}).defaultNow(),
	},
	(table) => [
		foreignKey({
			columns: [table.offerId],
			foreignColumns: [offers.id],
			name: "fk_order_offers_offer_id_offers",
		}),
		foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "fk_order_offers_order_id_orders",
		}),
		primaryKey({
			columns: [table.id, table.orderId, table.offerId],
			name: "pk_order_offers",
		}),
	],
);
