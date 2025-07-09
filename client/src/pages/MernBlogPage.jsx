import React, { useState } from 'react';

const MernBlog = () => {
  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with MERN Stack",
      excerpt: "Learn how to build full-stack applications using MongoDB, Express, React, and Node.js.",
      category: "Tutorial",
      date: "June 15, 2023",
      author: "Alex Johnson"
    },
    {
      id: 2,
      title: "State Management in React",
      excerpt: "Exploring different state management solutions for complex React applications.",
      category: "React",
      date: "June 10, 2023",
      author: "Sarah Williams"
    },
    {
      id: 3,
      title: "Optimizing MongoDB Queries",
      excerpt: "Best practices for improving query performance in MongoDB databases.",
      category: "Database",
      date: "June 5, 2023",
      author: "Michael Chen"
    }
  ];

  const categories = ["All", "Tutorial", "React", "Node.js", "Express", "MongoDB", "JavaScript"];
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">MERN Blog</h1>
          <p className="text-gray-600 mt-2">Latest news and tutorials about the MERN stack</p>
        </header>

        {/* Latest Posts Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Latest Posts</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Search */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg 
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Categories Filter */}
              <div className="w-full md:w-48">
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    <span className="ml-3 text-gray-700 font-medium">{post.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-12">
          <button 
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100 border'}`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`w-10 h-10 rounded-full ${
                currentPage === i + 1 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white hover:bg-gray-100 border'
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100 border'}`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MernBlog;