import { useState, type ChangeEvent, type FormEvent } from "react";
import { registerUser, type RegisterRequest } from "../services/authService";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RegisterPage() {

    const INITIAL_FORM_DATA: RegisterRequest = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
};

  const [formData, setFormData] = useState<RegisterRequest>(INITIAL_FORM_DATA);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function formatLabel(str: string) {
    const withSpaces = str.replace(/([A-Z])/g, " $1");

    const capitalized = withSpaces.replace(/\b\w/g, (char) =>
      char.toUpperCase(),
    );

    return capitalized.trim();
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await registerUser(formData);
      setSuccessMessage(response.message);
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message ?? "Request Failed");
      } else {
        setErrorMessage("Unexpected error occurred!");
      }
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Create Account</h2>
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <form onSubmit={handleSubmit}>
                {(Object.keys(formData) as Array<keyof typeof formData>).map(
                  (key) => {
                    return (
                      <div className="mb-3" key={key}>
                        <label className="form-label">{formatLabel(key)}</label>
                        <input
                          type={
                            key === "email" || key === "password" ? key : "text"
                          }
                          className="form-control"
                          value={formData[key]}
                          name={key}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    );
                  },
                )}
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
                <div className="mt-3">
                  Already have an account?
                  <Link to="/login" className="ms-2">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
