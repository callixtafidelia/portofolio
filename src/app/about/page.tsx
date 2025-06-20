// app/about/page.tsx
import React from 'react';
import Sidebar from '@/components/sidebar';
import { ArrowLeft, Download, GraduationCap, Award } from 'lucide-react';

export default function AboutMe() {
  const coursework = [
    'Machine Learning',
    'Statistical Analysis',
    'Database Systems',
    'Data Mining',
    'Python Programming',
    'R Programming',
  ];

  return (
    <div className="h-screen bg-gray-50 flex overflow-auto">
      <Sidebar active="about" />

      <main className="flex-1 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          {/* Back to Home */}
          <a
            href="/"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </a>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
            <p className="text-xl text-gray-600">My background, education, and journey in data science</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Story */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-8 space-y-6 text-gray-600">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Story</h2>
              <p>I'm a dedicated Data Science student…</p>
              <p>Through coursework and personal projects…</p>
              <p>My approach combines technical rigor…</p>
              <p>When I'm not working with data…</p>

              <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={20} />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Education */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center mb-6 space-x-3">
                  <GraduationCap size={20} className="text-blue-600 w-10 h-10 bg-blue-100 p-2 rounded-lg" />
                  <h3 className="text-xl font-bold text-gray-900">Education</h3>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Bachelor of Science in Data Science</h4>
                <p className="text-gray-600 text-sm mb-3">University Name • Expected 2025</p>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full inline-block">GPA 3.8/4.0</span>

                <div className="pt-4">
                  <h5 className="font-medium text-gray-900 mb-3">Relevant Coursework</h5>
                  <div className="flex flex-wrap gap-2">
                    {coursework.map((c, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center mb-6 space-x-3">
                  <Award size={20} className="text-purple-600 w-10 h-10 bg-purple-100 p-2 rounded-lg" />
                  <h3 className="text-xl font-bold text-gray-900">Certifications</h3>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Machine Learning Specialization</h4>
                    <p className="text-gray-600 text-sm">Stanford Online • 2023</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-1">Data Science Professional Certificate</h4>
                    <p className="text-gray-600 text-sm">IBM • 2022</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-100">Projects Completed</span>
                    <span className="font-bold">15+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Programming Languages</span>
                    <span className="font-bold">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Years Learning</span>
                    <span className="font-bold">3+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
