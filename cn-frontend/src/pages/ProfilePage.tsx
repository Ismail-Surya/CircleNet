import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { UserProfileResponse } from "../services/authService";
import { getProfile, updateProfile, type UpdateProfileRequest } from "../services/authService";
import axios from "axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);

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
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">My Profile</h2>
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    className="form-control"
                    value={profile.username}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    value={profile.email}
                    disabled
                  />
                </div>
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
                <button className="btn btn-primary" type="submit">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
