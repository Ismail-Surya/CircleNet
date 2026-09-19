import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import {
  createComment,
  createPost,
  getComments,
  getFeed,
  type CommentResponse,
  type CreateCommentRequest,
  type CreatePostRequest,
  type PostResponse,
} from "../services/authService";
import { Link } from "react-router-dom";

import axios from "axios";

export default function FeedPage() {
  const [posts, setPosts] = useState<PostResponse[]>([]);

  const [formData, setFormData] = useState<CreatePostRequest>({
    content: "",
  });

  const [comments, setComments] = useState<Record<number, CommentResponse[]>>(
    {},
  );

  const [ commentFormData, setCommentFormData ] = useState<Record <number, CreateCommentRequest>>(
    {}
  );

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const response = await getFeed();

      setPosts(response);

      for (const post of response) {
        loadComments(post.id);
      }
    } catch {
      setErrorMessage("Failed to load feed");
    }
  };

  const loadComments = async (postId: number) => {
    try {
      const response = await getComments(postId);
      setComments((prev) => ({
        ...prev,
        [postId]: response,
      }));
    } catch (err) {
      console.error(`Failed to load comments for post ${postId}`, err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>, postId: number) => {
    const { value } = event.target;

    setCommentFormData((prev) => ({ ...prev, [postId] : {
      content: value
    } }));
  }

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

      setSuccessMessage("Post created successfully.");

      loadComments(newPost.id);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 401) {
          setErrorMessage("You must be logged in to create a post.");
        } else if (status === 403) {
          setErrorMessage("You are not authorized to create a post.");
        } else if (status === 400) {
          setErrorMessage(
            err.response?.data?.message ?? "Invalid post content.",
          );
        } else {
          setErrorMessage(err.response?.data?.message ?? "Request failed.");
        }
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    }
  };

  const handleCommentSubmit = async (
    event: FormEvent<HTMLFormElement>,
    postId: number
  ) => {

    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    const request = commentFormData[postId] ?? {
      content: ""
    };

    try {

      const newComment = await createComment(postId, request);

      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] ?? []), newComment]
      }));

      setCommentFormData((prev) => ({
        ...prev,
        [postId]: {
          content: ""
        }
      }));

      setSuccessMessage("Comment added successfully.");

    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        if (status === 401) {
          setErrorMessage("You must be logged in to comment");
        } else if (status === 403) {
          setErrorMessage("You are not authorized to comment.");
        } else if (status === 400) {
          setErrorMessage(err.response?.data?.message ?? "Invalid comment.");
        } else if (status === 404) {
          setErrorMessage("Post not found.");
        } else {
          setErrorMessage(
            err.response?.data?.message ?? "Failed to add comment."
          );
        }
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    }

  }

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
              <Link
                to={`/users/${post.username}`}
                className="text-decoration-none"
              >
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
              </Link>
              <div>
                <Link
                  className="text-decoration-none text-dark"
                  to={`/users/${post.username}`}
                >
                  <h5 className="mb-0">
                    {post.firstName} {post.lastName}
                  </h5>
                </Link>
                <Link
                  className="text-decoration-none"
                  to={`/users/${post.username}`}
                >
                  <small className="text-muted">@{post.username}</small>
                </Link>
              </div>
            </div>
            <hr />
            <p>{post.content}</p>
            <small className="text-muted">
              {new Date(post.createdAt).toLocaleString()}
            </small>
            <hr />
            <h6>Comments</h6>
            {comments[post.id]?.length ? (
              <div className="mb-3">
                {comments[post.id].map((comment) => (
                  <div className="d-flex mb-3" key={comment.id}>
                    <Link
                      to={`/users/${comment.username}`}
                      className="text-decoration-none"
                    >
                      {comment.profilePictureUrl ? (
                        <img
                          src={comment.profilePictureUrl}
                          alt={`${comment.firstName} ${comment.lastName}`}
                          className="rounded-circle me-2"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <div
                          className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2"
                          style={{
                            width: "40px",
                            height: "40px",
                            fontSize: "18px",
                          }}
                        >
                          👤
                        </div>
                      )}
                    </Link>
                    <div>
                      <Link
                        to={`/users/${comment.username}`}
                        className="text-decoration-none text-dark"
                      >
                        <strong>
                          {comment.firstName} {comment.lastName}
                        </strong>
                      </Link>
                      <div>
                        <small className="text-muted">
                          @{comment.username}
                        </small>
                      </div>
                      <p className="mb-1">{comment.content}</p>
                      <small className="text-muted">
                        {new Date(comment.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No comments yet.</p>
            )}

            <form onSubmit={(event) => handleCommentSubmit(event, post.id)}>
              <div className="input-group">
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Write a comment ..."
                  value={commentFormData[post.id]?.content ?? ""}
                  onChange={ (event) => handleCommentChange(event, post.id) }
                  required
                  />
                <button className="btn btn-outline-primary" type="submit">Comment</button>
              </div>
            </form>

          </div>
        </div>
      ))}
    </div>
  );
}
