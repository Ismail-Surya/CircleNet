import { useEffect, useState } from "react";
import type { UserProfileResponse } from "../services/authService";
import { getProfile } from "../services/authService"
import axios from "axios";

export default function ProfilePage () {

    const [ profile, setProfile ] = useState<UserProfileResponse | null>(null);

    const [ loading, setLoading ] = useState<boolean>(true);

    const [ errorMessage, setErrorMessage ] = useState<string>("");

    useEffect(() => {

        async function loadProfile() {
            try {
                const response = await getProfile();

                setProfile(response);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setErrorMessage(error.response?.data?.message);
                } else {
                    setErrorMessage("Unexpected Error Occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        loadProfile();

    }, []);

    if (loading) {
        return (
            <div className="container mt-5">
                Loading ...
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    { errorMessage }
                </div>
            </div>
        );
    }

    if (!profile) {
        return null;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h2>
                        { profile.firstName } { profile.lastName }
                    </h2>
                    <h5 className="text-muted">
                        @{profile.username}
                    </h5>
                    <hr />
                    <p>
                        <strong>Email:</strong>
                        <br />
                        {profile.email}
                    </p>
                    <p>
                        <strong>Bio:</strong>
                        <br />
                        {profile.bio || "No bio yet."}
                    </p>
                    <p>
                        <strong>Joined:</strong>
                        <br />
                        {
                            new Date(profile.createdAt).toLocaleDateString()
                        }
                    </p>
                </div>
            </div>
        </div>
    );

}