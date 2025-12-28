import { z } from "zod";

export const zPaginatedSchema = z.object({
	total: z.number().int().nonnegative(),
	page: z.number().int().positive(),
	size: z.number().int().positive(),
	pages: z.number().int().nonnegative(),
});

export const zCountSchema = z.object({
	count: z.number().gte(0),
});

export const zQuantityFormSchema = z.object({
	quantity: z.number().int("Только целые числа").min(1, "Минимум 1 шт."),
});

export const zRoleEnum = z.enum(["ADMIN", "EMPLOYEE", "USER"]);
export const zWaybillTypeEnum = z.enum([
	"WAYBILL_IN",
	"WAYBILL_OUT",
	"WAYBILL_RETURN",
]);
export const zOrderStatusEnum = z.enum([
	"NEW",
	"IN_PROGRESS",
	"SHIPPING",
	"COMPLETED",
	"CANCELED",
]);
export const zCustomerTypeEnum = z.enum([
	"USER_RETAIL",
	"USER_WHOLESALE",
	"USER_SUPER_WHOLESALE",
]);
export const zShippingMethodEnum = z.enum(["SELF_PICKUP", "CARGO", "OTHER"]);

export const zCurrencyEnum = z.enum(["RUB", "USD", "EUR", "TRY"]);
export const zUserBalanceChangeReasonEnum = z.enum([
	"WAYBILL_PAYMENT",
	"ADMIN_ADJUSTMENT",
	"PROMOTION_CREDIT",
	"OTHER",
]);

export type QuantityFormSchema = z.infer<typeof zQuantityFormSchema>;
export type CountSchema = z.infer<typeof zCountSchema>;
export type RoleEnum = z.infer<typeof zRoleEnum>;
export type CustomerTypeEnum = z.infer<typeof zCustomerTypeEnum>;
export type WaybillTypeEnum = z.infer<typeof zWaybillTypeEnum>;
export type OrderStatusEnum = z.infer<typeof zOrderStatusEnum>;
export type ShippingMethodEnum = z.infer<typeof zShippingMethodEnum>;
export type CurrencyEnum = z.infer<typeof zCurrencyEnum>;
export type UserBalanceChangeReasonEnum = z.infer<
	typeof zUserBalanceChangeReasonEnum
>;

// Display Labels
export const USER_ROLE_LABELS: Record<RoleEnum, string> = {
	ADMIN: "Администратор",
	EMPLOYEE: "Сотрудник",
	USER: "Пользователь",
};

export const USER_TYPE_LABELS: Record<CustomerTypeEnum, string> = {
	USER_RETAIL: "Розница",
	USER_WHOLESALE: "Опт",
	USER_SUPER_WHOLESALE: "Супер-Опт",
};

export const WAYBILL_TYPE_LABELS: Record<WaybillTypeEnum, string> = {
	WAYBILL_IN: "Приход",
	WAYBILL_OUT: "Расход",
	WAYBILL_RETURN: "Возврат",
};

export const ORDER_STATUS_LABELS: Record<OrderStatusEnum, string> = {
	NEW: "Создан",
	IN_PROGRESS: "Сборка",
	SHIPPING: "Отправлен",
	COMPLETED: "Завершен",
	CANCELED: "Отменен",
};

export const SHIPPING_METHOD_LABELS: Record<ShippingMethodEnum, string> = {
	SELF_PICKUP: "Самовывоз",
	CARGO: "Курьер",
	OTHER: "Другое",
};
