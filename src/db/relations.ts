import { relations } from "drizzle-orm/relations";
import {
	account,
	addresses,
	auditLog,
	cartOffers,
	carts,
	categories,
	offers,
	orderOffers,
	orders,
	products,
	session,
	subCategories,
	user,
	userBalanceHistory,
	users,
	waybillOffers,
	waybills,
} from "./schema";

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));

export const userRelations = relations(user, ({ many }) => ({
	accounts: many(account),
	sessions: many(session),
	users: many(users),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const addressesRelations = relations(addresses, ({ one, many }) => ({
	user: one(users, {
		fields: [addresses.userId],
		references: [users.id],
	}),
	orders: many(orders),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
	addresses: many(addresses),
	auditLogs: many(auditLog),
	carts: many(carts),
	orders: many(orders),
	waybills_authorId: many(waybills, {
		relationName: "waybills_authorId_users_id",
	}),
	waybills_customerId: many(waybills, {
		relationName: "waybills_customerId_users_id",
	}),
	userBalanceHistories: many(userBalanceHistory),
	user: one(user, {
		fields: [users.authUserId],
		references: [user.id],
	}),
}));

export const auditLogRelations = relations(auditLog, ({ one }) => ({
	user: one(users, {
		fields: [auditLog.userId],
		references: [users.id],
	}),
}));

export const cartsRelations = relations(carts, ({ one, many }) => ({
	user: one(users, {
		fields: [carts.userId],
		references: [users.id],
	}),
	cartOffers: many(cartOffers),
}));

export const subCategoriesRelations = relations(
	subCategories,
	({ one, many }) => ({
		category: one(categories, {
			fields: [subCategories.categoryId],
			references: [categories.id],
		}),
		products: many(products),
	}),
);

export const categoriesRelations = relations(categories, ({ many }) => ({
	subCategories: many(subCategories),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
	address: one(addresses, {
		fields: [orders.addressId],
		references: [addresses.id],
	}),
	user: one(users, {
		fields: [orders.userId],
		references: [users.id],
	}),
	waybills: many(waybills),
	orderOffers: many(orderOffers),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
	subCategory: one(subCategories, {
		fields: [products.subCategoryId],
		references: [subCategories.id],
	}),
	offers: many(offers),
}));

export const offersRelations = relations(offers, ({ one, many }) => ({
	product: one(products, {
		fields: [offers.productId],
		references: [products.id],
	}),
	cartOffers: many(cartOffers),
	waybillOffers: many(waybillOffers),
	orderOffers: many(orderOffers),
}));

export const waybillsRelations = relations(waybills, ({ one, many }) => ({
	user_authorId: one(users, {
		fields: [waybills.authorId],
		references: [users.id],
		relationName: "waybills_authorId_users_id",
	}),
	user_customerId: one(users, {
		fields: [waybills.customerId],
		references: [users.id],
		relationName: "waybills_customerId_users_id",
	}),
	order: one(orders, {
		fields: [waybills.orderId],
		references: [orders.id],
	}),
	waybillOffers: many(waybillOffers),
	userBalanceHistories: many(userBalanceHistory),
}));

export const cartOffersRelations = relations(cartOffers, ({ one }) => ({
	cart: one(carts, {
		fields: [cartOffers.cartId],
		references: [carts.id],
	}),
	offer: one(offers, {
		fields: [cartOffers.offerId],
		references: [offers.id],
	}),
}));

export const waybillOffersRelations = relations(waybillOffers, ({ one }) => ({
	offer: one(offers, {
		fields: [waybillOffers.offerId],
		references: [offers.id],
	}),
	waybill: one(waybills, {
		fields: [waybillOffers.waybillId],
		references: [waybills.id],
	}),
}));

export const userBalanceHistoryRelations = relations(
	userBalanceHistory,
	({ one }) => ({
		user: one(users, {
			fields: [userBalanceHistory.userId],
			references: [users.id],
		}),
		waybill: one(waybills, {
			fields: [userBalanceHistory.waybillId],
			references: [waybills.id],
		}),
	}),
);

export const orderOffersRelations = relations(orderOffers, ({ one }) => ({
	offer: one(offers, {
		fields: [orderOffers.offerId],
		references: [offers.id],
	}),
	order: one(orders, {
		fields: [orderOffers.orderId],
		references: [orders.id],
	}),
}));
