import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { UserProfileResponse } from "../services/authService";
import {
  getProfile,
  updateProfile,
  type UpdateProfileRequest,
} from "../services/authService";
import axios from "axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);

  const [editing, setEditing] = useState<boolean>(false);

  const [formData, setFormData] = useState<UpdateProfileRequest>({
    firstName: "",
    lastName: "",
    bio: "",
    profilePictureUrl: "",
  });

  const [successMessage, setSuccessMessage] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const response = await getProfile();

      setProfile(response);

      setFormData({
        firstName: response.firstName,
        lastName: response.lastName,
        bio: response.bio ?? "",
        profilePictureUrl: response.profilePictureUrl ?? "",
      });
    } catch (error) {
      setErrorMessage("Failed to load profile.");
    }
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    try {
      const updatedProfile = await updateProfile(formData);
      setProfile(updatedProfile);
      setEditing(false);
      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message ?? "Request failed.");
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    }
  }

  if (!profile) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="row justify-content-center">
        <div className="col-md-8">
          {!editing ? (
            <div className="card shadow">
              <div className="card-body text-center">
                {
                  profile.profilePictureUrl ? (
                    <img
                      src={ profile.profilePictureUrl }
                      alt="Profile"
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
                  )
                }
                <h2>{profile.firstName} {profile.lastName}</h2>
                <h5 className="text-muted">@{profile.username}</h5>
                <hr />
                <p><strong>Bio</strong></p>
                <p>{ profile.bio || "No bio yet." }</p>
                <p><strong>Email</strong></p>
                <p>{profile.email}</p>
                <p><strong>Joined</strong></p>
                <p>{new Date(profile.createdAt).toLocaleDateString()}</p>
                <button className="btn btn-primary" onClick={() => setEditing(true)}
                  >
                    Edit Profile</button>
              </div>
            </div>
          ) : (
            <div className="card shadow">
              <div className="card-body">
                <h2 className="mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Profile Picture URL</label>
                    <input
                      className="form-control"
                      name="profilePictureUrl"
                      value={formData.profilePictureUrl}
                      onChange={handleChange}
                    />
                  </div>
                  <button className="btn btn-primary me-2" type="submit">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setFormData({
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        bio: profile.bio ?? "",
                        profilePictureUrl: profile.profilePictureUrl ?? ""
                      });
                      setEditing(false);
                    }
                    }
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
