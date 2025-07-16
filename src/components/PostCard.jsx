import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

function PostCard({ $id, title, featuredImage, content, slug, name, $createdAt, category }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    async function loadImage() {
      if (featuredImage) {
        try {
          const url = service.getFilePreview(featuredImage);
          setImageUrl(url);
        } catch (error) {
          console.error('Failed to load image preview:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    loadImage();
  }, [featuredImage]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse flex flex-col h-full">
        <div className="w-full h-56 bg-gray-300" />
        <div className="p-4 space-y-2">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2 mt-2"></div>
        </div>
        <div className="px-4 pb-4 flex justify-between items-center text-sm text-gray-300">
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/post/${slug}`} className="block h-full">

      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] border border-gray-200 flex flex-col h-full">
        {/* Image */}
        <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <span className="text-gray-400 text-sm animate-pulse">Loading image...</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 px-5 py-4 flex flex-col justify-between">
          {/* Title */}
          <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{title}</h4>

          {/* Description */}
          <div className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-3">
            {typeof content === 'string' ? parse(content.slice(20, 100) + '...') : 'No content available.'}
          </div>

          {/* Category Tag */}
          {category && (
            <div className="text-xs inline-block bg-rose-100 text-rose-500 px-3 py-1 rounded-full mb-2 w-max font-medium">
              {category}
            </div>
          )}

          {/* Footer Meta */}
          <div className="flex justify-between items-center text-xs font-medium text-gray-600">
            <p className="text-rose-500">
              By: <span className="font-semibold">{parse(name || "Anonymous")}</span>
            </p>
            <p className="text-gray-500">{new Date($createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
