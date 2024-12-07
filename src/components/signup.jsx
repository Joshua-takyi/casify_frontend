"use client";

import { RegisterUser } from "@/servers/action";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const { mutate, isLoading, error, isSuccess } = useMutation({
		mutationFn: RegisterUser,
		onSuccess: () => {
			console.log("User registered successfully");
			router.push("/signin");
		},
		onError: (err) => {
			console.error("Failed to register user:", err.message);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate inputs
		if (!email.trim() || !password.trim()) {
			console.error("Email and password are required");
			return;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			console.error("Invalid email format");
			return;
		}

		if (password.length < 6) {
			console.error("Password must be at least 6 characters long");
			return;
		}

		mutate({ email, password });
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<form onSubmit={handleSubmit}>
				<div className="w-[20rem] border-2 shadow-md p-4 rounded-md">
					{/* Email Input */}
					<div className="mb-4">
						<label htmlFor="email" className="block mb-2 font-medium">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
							placeholder="Enter your email"
							required
						/>
					</div>

					{/* Password Input */}
					<div className="mb-4">
						<label htmlFor="password" className="block mb-2 font-medium">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
							placeholder="Enter your password"
							required
						/>
					</div>

					{/* Submit Button */}
					<div className="mb-4">
						<button
							type="submit"
							className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
							disabled={isLoading}
						>
							{isLoading ? "Processing..." : "Sign Up"}
						</button>
						<div>
							<Link href={"/signin"}>
								Already have an account?{""}
								<span className={"text-blue-600"}> sign in</span>
							</Link>
						</div>
					</div>

					{/* Feedback Messages */}
					<div className="mb-4">
						{isLoading && <div className="text-blue-600">Processing...</div>}
						{!isLoading && error && (
							<div className="text-red-600">
								{error.message ||
									"An unexpected error occurred. Please try again."}
							</div>
						)}
						{!isLoading && isSuccess && (
							<div className="text-green-600">Registration successful!</div>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};
