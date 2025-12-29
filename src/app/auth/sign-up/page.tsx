import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/auth/signup-form";
import { auth } from "@/lib/auth";

export default async function Page() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (session) {
		redirect("/");
	}
	return (
		<div className="flex min-h-svh pb-8 lg:h-screen lg:pb-0">
			<div className="flex w-full items-center justify-center py-10 lg:w-1/2 lg:py-0">
				<div className="w-full max-w-md space-y-8 px-4">
					<SignupForm className="w-full" />
				</div>
			</div>

			<div className="hidden w-1/2 bg-gray-100 lg:block">
				<Image
					width={1000}
					height={1000}
					src="/main/car-parts-1.jpg"
					alt="Sign up"
					className="h-full w-full object-cover"
					unoptimized
				/>
			</div>
		</div>
	);
}
