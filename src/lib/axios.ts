import axios from "axios";

const axiosClient = axios.create({
	//https://emkc.org/api/v2/piston
	baseURL: process.env.NEXT_PUBLIC_PISTON_API_URL!,
	headers: {
		"Content-Type": "application/json",
	},
});

export {axiosClient};
