// src/components/Pages/Blog.jsx
import React from 'react';
import MetaData from '../Layouts/MetaData';
import ArticleIcon from '@mui/icons-material/Article';
import { ChevronRight, FilterList, CalendarToday } from '@mui/icons-material';

// --- Dummy Data ---
const DUMMY_POSTS = [
  { id: 1, title: "10 Tips for Smarter Online Shopping", excerpt: "Learn how to find the best deals and avoid common pitfalls when buying online...", date: "Oct 25, 2024", image: "https://via.placeholder.com/600x400?text=Online+Shopping", isFeatured: true, category: "Tips & Guides" },
  { id: 2, title: "Review: The New Wireless Earbuds", excerpt: "We take a deep dive into the latest earbuds model and see if they're worth the hype.", date: "Oct 20, 2024", image: "https://via.placeholder.com/600x400?text=Product+Review", category: "Reviews" },
  { id: 3, title: "Understanding Best2Buy's Price Match Guarantee", excerpt: "Everything you need to know about our commitment to the lowest prices.", date: "Oct 15, 2024", image: "https://via.placeholder.com/600x400?text=Company+News", category: "Company News" },
  { id: 4, title: "The Evolution of E-commerce in 2024", excerpt: "A look at the major trends shaping the future of buying and selling online.", date: "Oct 10, 2024", image: "https://via.placeholder.com/600x400?text=E-commerce+Trends", category: "Tips & Guides" },
];

// --- Blog Post Card Component ---
const BlogPostCard = ({ post }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl border border-gray-100">
    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
    <div className="p-5">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary-blue mb-2 block">{post.category}</span>
      <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{post.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
      <div className="flex justify-between items-center text-gray-500 text-xs mt-3">
        <span className='flex items-center'><CalendarToday sx={{ fontSize: 14 }} className="mr-1" /> {post.date}</span>
        <button className="flex items-center text-primary-blue font-semibold hover:text-blue-700 transition-colors">
          Read More <ChevronRight sx={{ fontSize: 18 }} />
        </button>
      </div>
    </div>
  </div>
);

// --- Main Blog Page Component ---
const Blog = () => {
  const featuredPost = DUMMY_POSTS.find(post => post.isFeatured) || DUMMY_POSTS[0];
  const otherPosts = DUMMY_POSTS.filter(post => post.id !== featuredPost.id);
  const categories = [...new Set(DUMMY_POSTS.map(post => post.category))]; 

  return (
    <>
      <MetaData title="Blog & Articles - Best2Buy" />
        
      <main className="w-full mt-20 min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <ArticleIcon sx={{ fontSize: 60 }} className="mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Best2Buy Blog</h1>
            <p className="text-xl text-blue-100">
              Your source for shopping guides, product reviews, and exclusive deals.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Main Content Area */}
            <div className="md:col-span-3">
                
              {/* Featured Post Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">✨ Featured Article</h2>
                <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col lg:flex-row border border-blue-200">
                  <div className="lg:w-1/2">
                    <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-64 lg:h-full object-cover" />
                  </div>
                  <div className="p-8 lg:w-1/2">
                    <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2 block">{featuredPost.category}</span>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">{featuredPost.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{featuredPost.excerpt}</p>
                    <div className='flex justify-between items-center'>
                        <span className='flex items-center text-gray-500 text-sm'><CalendarToday sx={{ fontSize: 16 }} className="mr-1" /> {featuredPost.date}</span>
                        <button className="px-6 py-2 bg-primary-blue text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
                            Read Full Article
                        </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Grid of Blog Post Cards */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Latest Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {otherPosts.map(post => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
                
              {/* Pagination */}
              <section className="flex justify-center items-center space-x-2 mt-8">
                <button className="px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-200">Previous</button>
                <button className="px-4 py-2 bg-primary-blue text-white rounded-lg font-bold">1</button>
                <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-200">2</button>
                <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-200">3</button>
                <button className="px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-200">Next</button>
              </section>

            </div>

            {/* Sidebar - Categories/Filters */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><FilterList className="mr-2" /> Categories</h3>
                <ul className="space-y-3">
                  {categories.map(category => (
                    <li key={category}>
                      <a href={`#category-${category.toLowerCase().replace(/ & /g, '').replace(/\s/g, '-')}`} className="text-gray-600 hover:text-primary-blue font-medium transition-colors block border-b pb-2">
                        {category} ({DUMMY_POSTS.filter(p => p.category === category).length})
                      </a>
                    </li>
                  ))}
                </ul>
                <div className='mt-6 pt-4 border-t'>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Archive</h3>
                    <p className='text-gray-600'>Coming Soon...</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default Blog;