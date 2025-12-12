import {forbidden, notFound, unauthorized} from "next/navigation";
import { AppError } from "@/lib/errors/AppError";

export async function handleResponse<T>(response: Response): Promise<T> {
	if (response.ok) {
		if (response.status === 204) return null as T;
		return response.json();
	}

	// Handling 404 and 422 Not Found,
	// calling notFound() immediately interrupts rendering and shows not-found.tsx
	if (response.status === 404 || response.status === 422) {
		console.log(response.statusText);
		notFound();
	}

	// Handle 401 and 403 Unauthorized/Forbidden
	if (response.status === 401) {
		unauthorized();
	}
	if (response.status === 403) {
		forbidden();
	}

	// 3. Other Errors: (500, etc.)
	// We throw an error to be caught by error.tsx
	let errorMessage = "Unknown error occurred.";
	try {
		const errorBody = await response.json();
		errorMessage = errorBody.message || errorBody.error || errorMessage;
	} catch {
		// If parsing JSON fails, fallback to status text
		errorMessage = response.statusText;
	}

	throw new AppError(response.status, errorMessage);
}
