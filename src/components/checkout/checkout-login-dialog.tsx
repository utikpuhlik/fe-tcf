"use client";

import * as React from "react";

import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

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
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (!open) return;

		// If user already dismissed in this tab, don't re-open.
		try {
			const dismissed = sessionStorage.getItem(storageKey) === "1";
			if (!dismissed) setIsOpen(true);
		} catch {
			setIsOpen(true);
		}
	}, [open, storageKey]);

	const handleContinueAsGuest = () => {
		try {
			sessionStorage.setItem(storageKey, "1");
		} catch {
			// ignore
		}
		onContinueAsGuest?.();
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Sign in to speed up checkout</DialogTitle>
					<DialogDescription>
						Sign in to autofill your details and track your orders. Or continue
						as a guest.
					</DialogDescription>
				</DialogHeader>

				{/* Your existing login form */}
				<LoginForm />

				<Separator className="my-2" />

				<Button
					type="button"
					variant="outline"
					className="w-full"
					onClick={handleContinueAsGuest}
				>
					Continue without an account
				</Button>
			</DialogContent>
		</Dialog>
	);
}
