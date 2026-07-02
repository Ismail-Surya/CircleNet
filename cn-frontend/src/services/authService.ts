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

export interface UserProfileResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePictureUrl: string | null;
    bio: string | null;
    createdAt: string;
    updatedAt: string
}

export interface UpdateProfileRequest {
    firstName: string,
    lastName: string,
    bio: string,
    profilePictureUrl: string
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

export async function getProfile() : Promise <UserProfileResponse> {
    const token = localStorage.getItem("token");

    const response = await axios.get<UserProfileResponse>(
        `${API_BASE_URL}/api/user/profile`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}

export async function updateProfile(request: UpdateProfileRequest) : Promise<UserProfileResponse> {
    const token = localStorage.getItem("token");

    const response = await axios.put<UserProfileResponse>(
        `${API_BASE_URL}/api/user/profile`,
        request,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}