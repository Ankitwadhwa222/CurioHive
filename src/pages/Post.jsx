import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import Container from "../components/Container";
import Button from "../components/Button";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "../styles/Css.css";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (!post) return;
    service.deletePost(post.$id).then((status) => {
      if (status) {
        if (post.featuredImage) {
          service.deletefile(post.featuredImage);
        }
        navigate("/");
      }
    });
  };

  // ✅ Show loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-12">
        <Container>
          <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
            <div className="h-8 bg-gray-300 rounded w-2/3 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
            <div className="h-96 bg-gray-300 rounded w-full" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full" />
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return post ? (
    <div className="px-4 bg-gray-100 min-h-screen font-[Inter] pb-10">
      <Container>
        {/* Title */}
        <div className="bg-gray-200 p-10 rounded-lg mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            {parse(post.title)}
          </h1>

          {/* Meta */}
          <div className="text-center text-md font-semibold text-rose-500 flex justify-center gap-8 mt-4">
            <p>
              Posted by: <span className="font-medium">{parse(post.name || "Author")}</span>
            </p>
            <p>{post.$createdAt?.substr(0, 10)}</p>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full max-w-4xl mx-auto mb-6 rounded-lg overflow-hidden shadow-lg">
          {post.featuredImage ? (
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          ) : (
            <div className="text-gray-600 italic text-center py-10 bg-gray-200">
              No featured image
            </div>
          )}

          {/* Edit/Delete Buttons */}
          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-1 rounded-md text-sm">
                  Edit
                </Button>
              </Link>
              <Button
                onClick={deletePost}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-1 rounded-md text-sm"
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-4xl mx-auto text-gray-800 py-2">
          {typeof post.content === "string" ? (
            <div className="gap-5">{parse(post.content)}</div>
          ) : (
            <p>No content</p>
          )}
        </div>
      </Container>

      {/* Author & Share Section */}
      <div className="max-w-7xl mx-auto mt-10 px-4 py-6 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Author Info */}
        <div className="text-left">
          <p className="text-gray-500 text-sm">Written by:</p>
          <p className="text-lg font-semibold text-black">{post.name || "Anonymous"}</p>
          <p className="text-sm text-gray-600">@{post.userId}</p>
        </div>

        {/* Share Buttons */}
        <div className="text-right">
          <p className="text-gray-500 text-sm mb-2">Share this blog:</p>
          <div className="flex space-x-4 text-xl text-gray-700">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href={`mailto:?subject=Check this blog&body=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-envelope"></i>
            </a>
            <a
              href={window.location.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-link"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center py-20 text-gray-400 text-lg">Post not found</div>
  );
}
