import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import PostCard from '../components/PostCard';
import service from '../appwrite/config';

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts([]).then((res) => {
      if (res) {
        setPosts(res.documents);
      }
    });
  }, []);

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <Container>
        {/* 🔥 Add your top section content here */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-[Inter]">
            Explore All Blog Posts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            Dive into our complete archive of blog posts. Discover content across categories like Technology, Lifestyle, Health, and more. Updated regularly by our community of writers.
          </p>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
