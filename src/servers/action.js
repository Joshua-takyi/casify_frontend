"use server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export async function GetData() {
	const getData = async () => {
		try {
			const res = await fetch(`${baseUrl}/api/getProducts`, {
				method: GET,
			});
			if (!res) {
				throw new Error("Something went wrong");
			}

			const data = await res.json();
			return data;
		} catch (error) {
			throw new Error(
				"Something went wrong whiles fetching data",
				error.message
			);
		}
	};
	return getData();
}

export async function PostData({ data }) {
	const postData = async () => {
		try {
			const res = await fetch(`${baseUrl}/api/addProduct`, {
				method: POST,
				headers: "content-type:application/json",
				body: JSON.stringify(data),
			});

			if (!res) {
				throw new Error("failed to add data");
			}
		} catch (error) {
			throw new Error("failed to add data", error.message);
		}
	};
	return postData();
}
