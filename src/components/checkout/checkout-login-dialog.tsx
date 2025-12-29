"use client";

import { LoginDialog } from "@/components/auth/login-dialog";

type CheckoutLoginDialogProps = {
	open: boolean;
	/**
	 * Optional: avoid showing dialog again after user chooses guest.
	 * Uses sessionStorage so it resets when tab is closed.
	 */
	storageKey?: string;
	/**
	 * Optional hook for analytics / state.
	 */
	onContinueAsGuest?: () => void;
};

export function CheckoutLoginDialog({
	open,
	storageKey = "checkout-login-dialog-dismissed",
	onContinueAsGuest,
}: CheckoutLoginDialogProps) {
	return (
		<LoginDialog
			open={open}
			storageKey={storageKey}
			onContinueAsGuest={onContinueAsGuest}
		/>
	);
}
