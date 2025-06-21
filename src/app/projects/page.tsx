// src/app/projects/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import {
  ArrowLeft,
  Star,
  Code,
  ExternalLink,
  Github,
} from "lucide-react";

export default function ProjectsPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  const featured = [
    {
      id: 1,
      number: "01",
      title: "Customer Churn Prediction",
      description:
        "Machine learning model to predict customer churn using ensemble methods with 94% accuracy. This project helps businesses identify customers at risk of leaving and take proactive retention measures.",
      skills: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "XGBoost"],
    },
    {
      id: 2,
      number: "02",
      title: "Sales Forecasting Dashboard",
      description:
        "Interactive dashboard for sales forecasting using time series analysis and Streamlit. The dashboard allows business users to visualize historical sales data and generate forecasts with adjustable parameters.",
      skills: ["Python", "Streamlit", "Prophet", "Plotly", "Pandas"],
    },
    {
      id: 3,
      number: "03",
      title: "Sentiment Analysis Tool",
      description:
        "NLP tool that analyzes customer reviews and social media posts to determine sentiment. Built with transformers and deployed as a web app for real-time analysis.",
      skills: ["Python", "Transformers", "NLTK", "Flask", "Docker"],
    },
    {
      id: 4,
      number: "04",
      title: "Stock Price Predictor",
      description:
        "Deep learning model using LSTM networks to predict stock prices. Features technical indicators, multiple timeframes, and risk assessment metrics for informed trading decisions.",
      skills: ["Python", "TensorFlow", "Keras", "Yahoo Finance API", "NumPy"],
    },
  ];

  const handleAction = (
    action: "code" | "demo" | "github",
    project: typeof featured[0]
  ) => {
    console.log(`${action} clicked for project:`, project.title);
    // e.g. router.push(project.demoUrl) or window.open(...)
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-auto">
      <Sidebar active="projects" />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto mb-8">
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
          <p className="text-gray-600">
            A collection of my data science and machine learning projects
          </p>
        </div>

        {/* Featured Projects */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="flex items-center mb-6">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featured.map((proj) => (
              <div
                key={proj.id}
                className="relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1"
                onMouseEnter={() => setHovered(proj.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Hover overlay behind content */}
                {hovered === proj.id && (
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-10 pointer-events-none z-0 transition-opacity duration-300" />
                )}

                {/* Card content */}
                <div className="relative z-10 flex">
                  <div className="w-32 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-300 opacity-60">
                      {proj.number}
                    </span>
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {proj.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.skills.map((s, i) => (
                        <span
                          key={i}
                          className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAction("code", proj)}
                        className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md border border-gray-300 transition-colors"
                      >
                        <Code className="w-4 h-4 mr-1" />
                        Code
                      </button>
                      <button
                        onClick={() => handleAction("demo", proj)}
                        className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live Demo
                      </button>
                      <button
                        onClick={() => handleAction("github", proj)}
                        className="flex items-center px-3 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md border border-gray-300 transition-colors"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        GitHub
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Projects & Skills Overview */}
        <section className="max-w-6xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">
                Explore more projects and view the complete portfolio
              </p>
              <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">12+</div>
                <div className="text-sm text-gray-600">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-600">Machine Learning</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">4</div>
                <div className="text-sm text-gray-600">Web Applications</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Python",
                "Scikit-learn",
                "TensorFlow",
                "Pandas",
                "Streamlit",
                "Flask",
                "Docker",
                "PostgreSQL",
                "MongoDB",
                "AWS",
                "Git",
                "Jupyter",
              ].map((tech, i) => (
                <span
                  key={i}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full border border-gray-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
