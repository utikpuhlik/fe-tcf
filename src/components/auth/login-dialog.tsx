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

type LoginDialogProps = {
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
	title?: string;
	description?: string;
	continueAsGuestLabel?: string;
};

export function LoginDialog({
	open,
	storageKey = "login-dialog-dismissed",
	onContinueAsGuest,
	title = "Войдите, чтобы ускорить оформление",
	description = "Войдите, чтобы автоматически подставить данные и отслеживать заказы. Или продолжайте как гость.",
	continueAsGuestLabel = "Продолжить без аккаунта",
}: LoginDialogProps) {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (!open) return;

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
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<LoginForm showHeader={false} showFooter />

				<Separator className="my-2" />

				<Button
					type="button"
					variant="outline"
					className="w-full"
					onClick={handleContinueAsGuest}
				>
					{continueAsGuestLabel}
				</Button>
			</DialogContent>
		</Dialog>
	);
}
