import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef, useState } from "react";
import 'animate.css';

function Search({searchTerm , setSearchTerm , selectedCategory , setSelectedCategory}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

    return (
    <div
      ref={sectionRef}
      className={`w-full bg-gradient-to-r from-gray-950 via-gray-800 to-gray-950 py-30 px-4 shadow-lg transition-all duration-700 h-fit ${
        isVisible ? "animate__animated animate__fadeInDown" : "opacity-0"
      }`}
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 86%, 50% 100%, 0% 86%)",
      }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h4 className="text-4xl md:text-5xl font-semibold text-white mb-6 font-[Inter]">
          Discover Posts by Category
        </h4>
        <p className="text-lg text-gray-300 mb-10 font-light">
          Easily find content you're interested in by searching or exploring common categories.
        </p>

        {/* Search bar */}
        <div className="relative w-full md:w-2/3 mx-auto mb-12">
          <MagnifyingGlassIcon
            className="w-5 h-5 text-rose-500 absolute top-1/2 left-4 transform -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search for blog posts, topics, or keywords..."
            className="w-full pl-12 pr-4 py-3 rounded-lg shadow-xl shadow-gray-700 focus:outline-none text-white bg-gray-900 border border-gray-600 focus:border-rose-500 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Suggested Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
          {[
            "Technology",
            "Health",
            "Education",
            "Travel",
            "Finance",
            "Food",
            "Lifestyle",
            "Coding",
          ].map((category) => (
            <div
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`border p-4 rounded-lg cursor-pointer text-center transition-colors duration-300
                ${selectedCategory === category
                  ? "bg-rose-500 text-white border-rose-500"
                  : "bg-white text-gray-800 hover:bg-rose-500 hover:text-white"}`}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
