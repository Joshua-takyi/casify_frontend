//

"use server";

import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GetData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/getProducts`, {
      method: "GET", // Corrected
    });
    if (!res.ok) {
      // Check if the response is not OK
      throw new Error("Something went wrong");
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      `Something went wrong while fetching data: ${error.message}` // Corrected
    );
  }
}

export async function RegisterUser({ email, password }) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorMessage =
        (await res.json()).message ||
        `Failed to register. HTTP Status: ${res.status}`;
      throw new Error(errorMessage);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Registration failed:", error.message);
    throw new Error(`Registration failed: ${error.message}`);
  }
}

export async function SignUserIn({ email, password }) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error(`Failed to login. HTTP Status: ${res.status}`);
    }

    const data = await res.json();

    // Log the response for debugging
    console.log("Login response:", data);

    await cookies().set("token", data.token);

    return data;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
}
