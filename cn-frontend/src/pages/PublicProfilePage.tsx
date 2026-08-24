import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  getPublicProfile,
  type PublicProfileResponse,
} from "../services/authService";

export default function PublicProfilePage() {
  const { username } = useParams<{ username: string }>();

  const [profile, setProfile] = useState<PublicProfileResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadProfile();
  }, [username]);

  async function loadProfile() {
    if (!username) {
      setErrorMessage("Username was not provided.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await getPublicProfile(username);

      setProfile(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setErrorMessage("User not found.");
        } else if (error.response?.status === 401) {
          setErrorMessage("You are not authenticated.");
        } else if (error.response?.status === 403) {
          setErrorMessage(
            "You are not authorized to view this profile.",
          );
        } else {
          setErrorMessage(
            error.response?.data?.message ??
              "Failed to load profile.",
          );
        }
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          Loading profile...
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-danger">
              {errorMessage}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body text-center">
              {profile.profilePictureUrl ? (
                <img
                  src={profile.profilePictureUrl}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="rounded-circle mb-3"
                  width={150}
                  height={150}
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: "150px",
                    height: "150px",
                    fontSize: "60px",
                  }}
                >
                  👤
                </div>
              )}

              <h2>
                {profile.firstName} {profile.lastName}
              </h2>

              <h5 className="text-muted">
                @{profile.username}
              </h5>

              <hr />

              <p>
                <strong>Bio</strong>
              </p>

              <p>
                {profile.bio || "No bio yet."}
              </p>

              <p>
                <strong>Joined</strong>
              </p>

              <p>
                {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}