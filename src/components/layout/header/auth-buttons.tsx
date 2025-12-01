import { Button } from "@/components/ui/button";

export default function AuthButtons() {
	return (
		<div className="flex gap-2">
			<a href="/auth/sign-in">
				<Button variant="default">Sign in</Button>
			</a>
			<a href="/auth/sign-up">
				<Button variant="secondary">Sign up</Button>
			</a>
		</div>
	);
}
