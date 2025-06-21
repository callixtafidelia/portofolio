// src/app/blog/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  Search,
  Filter,
} from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Principal Component Analysis",
      description:
        "A deep dive into how PCA works and when to use it for dimensionality reduction in your data science projects.",
      date: "May 15, 2024",
      category: "Machine Learning",
      readTime: "8 min read",
      slug: "understanding-pca",
    },
    {
      id: 2,
      title: "Comparing Classification Algorithms",
      description:
        "An analysis of different classification algorithms and their performance on various datasets.",
      date: "April 22, 2024",
      category: "Machine Learning",
      readTime: "12 min read",
      slug: "comparing-classification-algorithms",
    },
    {
      id: 3,
      title: "Data Visualization Best Practices",
      description:
        "Tips and techniques for creating effective and insightful data visualizations.",
      date: "March 10, 2024",
      category: "Data Visualization",
      readTime: "6 min read",
      slug: "data-visualization-best-practices",
    },
    {
      id: 4,
      title: "Introduction to Time Series Forecasting",
      description:
        "A beginner's guide to time series analysis and forecasting techniques.",
      date: "February 5, 2024",
      category: "Time Series",
      readTime: "10 min read",
      slug: "intro-to-time-series-forecasting",
    },
    {
      id: 5,
      title: "Feature Engineering Techniques",
      description:
        "Essential techniques for creating and selecting features that improve model performance.",
      date: "January 18, 2024",
      category: "Machine Learning",
      readTime: "14 min read",
      slug: "feature-engineering-techniques",
    },
    {
      id: 6,
      title: "Building Interactive Dashboards with Streamlit",
      description:
        "Step-by-step guide to creating interactive data science dashboards using Streamlit.",
      date: "December 22, 2023",
      category: "Data Visualization",
      readTime: "11 min read",
      slug: "streamlit-dashboards",
    },
  ];

  const categories = [
    "All",
    "Machine Learning",
    "Data Visualization",
    "Time Series",
    "Deep Learning",
  ];

  const getCategoryColor = (cat: string) => {
    const map: Record<string, string> = {
      "Machine Learning": "bg-blue-100 text-blue-800 border-blue-200",
      "Data Visualization":
        "bg-green-100 text-green-800 border-green-200",
      "Time Series": "bg-purple-100 text-purple-800 border-purple-200",
      "Deep Learning": "bg-red-100 text-red-800 border-red-200",
    };
    return map[cat] ?? "bg-gray-100 text-gray-800 border-gray-200";
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(term) ||
      post.description.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  const handleRead = (slug: string) => {
    console.log("Navigate to:", slug);
    // e.g. router.push(`/blog/${slug}`)
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-auto">
      <Sidebar active="blog" />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto mb-8">
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
          <p className="text-gray-600">
            Articles and insights on data science and machine learning
          </p>
        </div>

        {/* Search & Filters */}
        <div className="max-w-6xl mx-auto mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredPosts.length} of {blogPosts.length} articles
            </p>
          </div>
        </div>

        {/* Posts */}
        <div className="max-w-6xl mx-auto space-y-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Meta */}
                <div className="md:w-48 p-6 bg-gray-50 border-r border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.date}
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(
                        post.category
                      )}`}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {post.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 p-6">
                  <h2
                    className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => handleRead(post.slug)}
                  >
                    {post.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <button
                    onClick={() => handleRead(post.slug)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group"
                  >
                    Read article
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          )}
        </div>

        {/* Newsletter & Stats */}
        <div className="max-w-6xl mx-auto mt-12 space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6">
              Get notified when I publish new articles about data science and
              machine learning.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {blogPosts.length}
              </div>
              <div className="text-sm text-gray-600">Total Articles</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {categories.length - 1}
              </div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {blogPosts.reduce(
                  (sum, p) =>
                    sum + parseInt(p.readTime.replace(/\D/g, ""), 10),
                  0
                )}
              </div>
              <div className="text-sm text-gray-600">Total Read Time</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">2024</div>
              <div className="text-sm text-gray-600">Started Writing</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
