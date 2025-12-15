"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useFormContext } from "react-hook-form";
import { env } from "@/env";
import type { SignInSchema } from "@/lib/schemas/forms/authSchema";

export function TurnstileField() {
	const { setValue, clearErrors } = useFormContext<SignInSchema>();

	return (
		<Turnstile
			siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
			className="w-full"
			options={{
				theme: "light",
				size: "flexible",
				// appearance: "interaction-only",
			}}
			onSuccess={(token: string) => {
				setValue("turnstileToken", token, { shouldDirty: true });
				clearErrors("turnstileToken");
			}}
			onExpire={() => setValue("turnstileToken", "", { shouldDirty: true })}
			onError={() => setValue("turnstileToken", "", { shouldDirty: true })}
		/>
	);
}
