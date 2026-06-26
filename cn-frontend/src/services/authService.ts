import axios from "axios";

const API_BASE_URL = "http://localhost:8787";

export type RegisterRequest = {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export type RegisterResponse = {
    message: string
}

export interface LoginRequest {
    username: string,
    password: string
}

export interface LoginResponse {
    token: string
}

export const registerUser = async (request : RegisterRequest) :
    Promise <RegisterResponse> => {

    const response = await axios.post <RegisterResponse> (
        `${API_BASE_URL}/api/auth/register`,
        request
    );

    return response.data;

}

export const loginUser = async (request: LoginRequest) :
    Promise <LoginResponse> => {

        const response = await axios.post<LoginResponse> (
            `${API_BASE_URL}/api/auth/login`,
            request
        );

        return response.data;

    }

export async function getCurrentUser() : Promise <string> {
    const token = localStorage.getItem("token");

    const response = await axios.get<string>(
        `${API_BASE_URL}/api/user/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}