import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import {
  createPost,
  getFeed,
  type CreatePostRequest,
  type PostResponse,
} from "../services/authService";

import axios from "axios";

export default function FeedPage() {
  const [posts, setPosts] = useState<PostResponse[]>([]);

  const [formData, setFormData] = useState<CreatePostRequest>({
    content: "",
  });

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const response = await getFeed();

      setPosts(response);
    } catch {
      setErrorMessage("Failed to load feed");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    try {
      const newPost = await createPost(formData);
      setPosts((prev) => [newPost, ...prev]);
      setFormData({
        content: "",
      });

      setSuccessMessage("Post created successfully");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMessage(err.response?.data?.message ?? "Request failed.");
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">CircleNet Feed</h2>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows={4}
                placeholder="What's on your mind?"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Create Post
            </button>
          </form>
        </div>
      </div>
      {posts.map((post) => (
        <div className="card mb-3" key={post.id}>
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              {post.profilePictureUrl ? (
                <img
                  src={post.profilePictureUrl}
                  alt={`${post.firstName} ${post.lastName}`}
                  className="rounded-circle me-3"
                  width={50}
                  height={50}
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    fontSize: "24px",
                  }}
                >
                  👤
                </div>
              )}
              <div>
                <h5 className="mb-0">
                  {post.firstName} {post.lastName}
                </h5>
                <small className="text-muted">@{post.username}</small>
              </div>
            </div>
            <hr />
            <p>{post.content}</p>
            <small className="text-muted">
              {new Date(post.createdAt).toLocaleString()}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}
