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

export const registerUser = async (request : RegisterRequest) :
    Promise <RegisterResponse> => {

    const response = await axios.post <RegisterResponse> (
        `${API_BASE_URL}/api/auth/register`,
        request
    );

    return response.data;

}