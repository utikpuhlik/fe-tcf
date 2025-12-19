"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useFormContext } from "react-hook-form";
import { env } from "@/env";

type TurnstileFormValues = {
	turnstileToken: string;
};

export function TurnstileField() {
	const { setValue, clearErrors } = useFormContext<TurnstileFormValues>();

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
