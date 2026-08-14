import { createPost, getFeed, type PostResponse } from "../services/authService";
import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { type CreatePostRequest } from "../services/authService";
import axios, { isAxiosError } from "axios";

export default function FeedPage() {
  const [posts, setPosts] = useState<PostResponse[]>([]);

  useEffect(() => {
    loadFeed();
  }, []);

  async function loadFeed() {
    try {
      const thePosts = await getFeed();
      setPosts(thePosts);
    } catch (err) {}
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addButtonRef = useRef(null);

  const onMouseDownAddPostButton = () => {
    if (addButtonRef.current) addButtonRef.current.style.background = `blue`;
  };

  const onMouseUpAddPostButton = () => {
    if (addButtonRef.current)
      addButtonRef.current.style.background = `RoyalBlue`;
  };

  type ModalProps = {
    isOpen: boolean;
    setIsOpen: Function;
  };

  const Modal = ({ isOpen, setIsOpen }: ModalProps) => {

    const [formData, setFormData] = useState<CreatePostRequest>({
    content: ``,
  });

    const handleSubmission = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const post:PostResponse = await createPost(formData);
        setPosts((prev) => [post, ...prev]);
        setIsOpen(false);
      } catch(err) {
        
      }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (isOpen) {
      return (
        <div
          style={{
            display: "flex",
            position: "fixed",
            zIndex: "1000",
            left: "0",
            top: "0", // Added comma
            width: "100%",
            height: "100%", // Added comma
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center", // Changed to camelCase, added comma
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "500px", // Added comma
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Changed to camelCase, added comma
              position: "relative",
            }}
          >
            <span
              id="closeBtn"
              style={{
                position: "absolute",
                top: "12px",
                right: "16px",
                fontSize: "28px",
                fontWeight: "bold",
                cursor: "pointer",
                color: "#aaa",
              }}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </span>

            <h2>Add a new post</h2>
            <form onSubmit={handleSubmission}>
              <input
                style={{
                  margin: `0.4rem`,
                  padding: `0.6rem`,
                  border: `0.1rem solid black`,
                  borderRadius: `0.2rem`,
                }}
                name={`content`}
                value={formData[`content`]}
                type="text"
                placeholder="Content"
                onChange={handleChange}
              />
              <button
                ref={addButtonRef}
                style={{
                  margin: `0.4rem`,
                  padding: `0.6rem`,
                  border: `0`,
                  background: `royalblue`,
                  color: `white`,
                  borderRadius: `0.2rem`,
                }}
                onMouseUp={() => onMouseUpAddPostButton()}
                onMouseDown={() => onMouseDownAddPostButton()}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        display: `flex`,
        marginTop: `3rem`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `center`,
      }}
    >
      <div>
        <button
          ref={addButtonRef}
          style={{
            margin: `0.4rem`,
            padding: `0.6rem`,
            border: `0`,
            background: `royalblue`,
            color: `white`,
            borderRadius: `0.2rem`,
          }}
          onMouseUp={() => onMouseUpAddPostButton()}
          onMouseDown={() => onMouseDownAddPostButton()}
          onClick={() => setIsOpen(true)}
        >
          Add a new post
        </button>
      </div>
      {posts.length == 0 ? (
        <div>No posts</div>
      ) : (
        <div>
          {posts.map((post) => (
            <div
              style={{
                width: `50rem`,
                border: `0.1rem solid black`,
                borderRadius: `0.5rem`,
                margin: `0.5rem`,
                padding: `0.5rem`,
              }}
            >
              <h6 style={{ margin: `0.3rem 1.6rem`, color: `royalblue` }}>
                {post.firstName} {post.lastName}
              </h6>{" "}
              <h3
                style={{
                  textAlign: `center`,
                  margin: `0 auto`,
                  color: "#36454F",
                }}
              >
                {post.content}
              </h3>{" "}
              <br />{" "}
            </div>
          ))}
        </div>
      )}
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
