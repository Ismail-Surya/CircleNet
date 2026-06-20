import axios from "axios";
import { loginUser, type LoginRequest } from "../services/authService";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function formatLabel(str:string) {
    
    const withSpaces = str.replace(/([A-Z])/g, " $1");

    
    const capitalized = withSpaces.replace(/\b\w/g, (char) =>
      char.toUpperCase(),
    );

    
    return capitalized.trim();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name] : value}));
  }

  async function handleSubmit (event: FormEvent<HTMLFormElement>) : Promise <void> {
    event.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');
    try {
        const response = await loginUser(formData);
        setSuccessMessage(response.message);
        setFormData({
            username: "",
            password: ""
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            setErrorMessage(error.response?.data?.message ?? 'Request Failed');
        } else {
            setErrorMessage('Unexpected error occurred!');
        }
    }

  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                {
                    successMessage && <div className="alert alert-success">{successMessage}</div>
                }
                {
                    errorMessage && <div className="alert alert-danger">{errorMessage}</div>
                }
                {(Object.keys(formData) as Array<keyof typeof formData>).map(
                  (key) => {
                    return (
                      <div className="mb-3" key = {key}>
                        <label className="form-label">{ formatLabel(key) }</label>
                        <input name = {key} value={formData[key]} onChange = {handleChange} type={
                            key === "password" ? key : "text"
                        } className="form-control" required />
                      </div>
                    );
                  },
                )}
                <button type="submit" className="btn btn-primary">Login</button>
                <div className="mt-3">
                    Don't have an account?
                <Link to="/register" className="ms-2">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
