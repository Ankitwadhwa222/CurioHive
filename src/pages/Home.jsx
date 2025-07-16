import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import Container from "../components/Container";
import PostCard from "../components/PostCard";
import Search from "../components/Search";
import { Query } from "appwrite"; // ✅ make sure this is imported

function Home() {
  const [activePosts, setActivePosts] = useState([]);
  const [inactivePosts, setInactivePosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch active posts
    const fetchPosts = async () => {
      try {
        const activeRes = await service.getPosts([
          Query.equal("status", "active"),
        ]);
        if (activeRes) {
          setActivePosts(activeRes.documents);
        }

        // Fetch inactive posts
        const inactiveRes = await service.getPosts([
          Query.equal("status", "inactive"),
        ]);
        if (inactiveRes) {
          setInactivePosts(inactiveRes.documents);
        }
      } catch (err) {
        console.error("Fetching posts failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredActive = activePosts.filter((post) => {
    const inTitle = post.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const inContent = post.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory ? post.category === selectedCategory : true;

    return (inTitle || inContent) && categoryMatch;
  });

  if (loading) {
    return (
      <div className="w-full bg-gray-50 min-h-screen py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Loading Posts...
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white shadow rounded-lg p-4 space-y-4"
              >
                <div className="h-40 bg-gray-300 rounded w-full"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Container>


        {/* ✅ Active Posts Section */}
        <h1 className="text-3xl font-bold mb-8   text-gray-800 mt-8 font-[Inter] tracking-tight">
          Explore Latest Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 px-4 mb-10">
          {filteredActive.length > 0 ? (
            filteredActive.map((post) => (
              <PostCard key={post.$id} {...post} slug={post.slug} />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500 text-lg">
              No post found related to your search or filter.
            </p>
          )}
        </div>


        {/* 🔴 Inactive Posts Section */}
       {inactivePosts.length > 0 && (
  <div className="mb-16 w-full mt-20 px-4">
    <h1 className="text-2xl font-[Inter] tracking-tighter font-semibold mb-5">
      Inactive Posts
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {inactivePosts.map((post) => (
        <PostCard key={post.$id} {...post} slug={post.slug} />
      ))}
    </div>
  </div>
)}

      </Container>
    </div>
  );
}

export default Home;
