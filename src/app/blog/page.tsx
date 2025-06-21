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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    // ...add your other posts here
  ];

  const categories: string[] = [
    "All",
    "Machine Learning",
    "Data Visualization",
    "Time Series",
    "Deep Learning",
  ];

  const getCategoryColor = (cat: string): string => {
    const map: Record<string, string> = {
      "Machine Learning": "bg-blue-100 text-blue-800 border-blue-200",
      "Data Visualization": "bg-green-100 text-green-800 border-green-200",
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
                onChange={(e) => setSelectedCategory(e.target.value)}
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
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors block"
                  >
                    {post.title}
                  </Link>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group"
                  >
                    Read article
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
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
      </main>
    </div>
  );
}
