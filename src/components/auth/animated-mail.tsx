"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail, MailOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type AnimatedMailProps = {
	className?: string;
};
// ? Maybe use plain SVG without framer-motion
export function AnimatedMail({ className }: AnimatedMailProps) {
	const reduceMotion: boolean | null = useReducedMotion();
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		if (reduceMotion) return;

		const id = window.setInterval(() => {
			setOpen((v) => !v);
		}, 2200);

		return () => window.clearInterval(id);
	}, [reduceMotion]);

	return (
		<div
			className={cn("flex items-center justify-center", className)}
			aria-hidden="true"
		>
			<div className="relative h-20 w-20">
				{/* Иконки конверта (закрыт/открыт) */}
				<div className="absolute inset-0 z-10 flex items-center justify-center">
					<motion.div
						className="absolute"
						animate={
							reduceMotion
								? { opacity: 1 }
								: open
									? { opacity: 0, scale: 0.96 }
									: { opacity: 1, scale: 1 }
						}
						transition={{ duration: 0.25 }}
					>
						<Mail className="size-12" />
					</motion.div>

					<motion.div
						className="absolute"
						animate={
							reduceMotion
								? { opacity: 0 }
								: open
									? { opacity: 1, scale: 1 }
									: { opacity: 0, scale: 1.02 }
						}
						transition={{ duration: 0.25 }}
					>
						<MailOpen className="size-12" />
					</motion.div>
				</div>

				{/* Небольшой “пинг” для ощущения отправки */}
				{!reduceMotion && (
					<motion.div
						className="-translate-x-1/2 absolute top-1 left-1/2 z-20 size-2 rounded-full bg-foreground/60"
						animate={
							open ? { opacity: [0, 1, 0], y: [-2, -10, -18] } : { opacity: 0 }
						}
						transition={{ duration: 0.7 }}
					/>
				)}
			</div>
		</div>
	);
}
