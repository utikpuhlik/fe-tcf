import { Loader2 } from "lucide-react";
import type * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
	isLoading?: boolean;
	loaderClassName?: string;
};

export function LoadingButton({
	isLoading = false,
	loaderClassName,
	className,
	children,
	disabled,
	...props
}: LoadingButtonProps) {
	return (
		<Button
			className={cn("relative", className)}
			disabled={disabled || isLoading}
			{...props}
		>
			<span className={cn(isLoading && "opacity-0")}>{children}</span>
			{isLoading && (
				<span className="absolute inset-0 flex items-center justify-center">
					<Loader2 className={cn("size-4 animate-spin", loaderClassName)} />
				</span>
			)}
		</Button>
	);
}
