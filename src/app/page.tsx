import React from 'react';
import { 
  User, 
  Briefcase, 
  Zap, 
  FolderOpen, 
  FileText, 
  Mail, 
  Github, 
  Linkedin,
  Download,
  ArrowRight,
  BarChart3,
  Users,
  Award
} from 'lucide-react';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Profile Section */}
        <div className="p-6 text-center border-b">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
            YN
          </div>
          <h2 className="text-xl font-bold text-gray-900">Your Name</h2>
          <p className="text-gray-600 text-sm">Data Scientist</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg">
              <User size={20} />
              <span className="font-medium">Home</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <User size={20} />
              <span>About</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Briefcase size={20} />
              <span>Experience</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Zap size={20} />
              <span>Skills</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <FolderOpen size={20} />
              <span>Projects</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <FileText size={20} />
              <span>Blog</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Mail size={20} />
              <span>Contact</span>
            </div>
          </div>
        </nav>

        {/* Connect Section */}
        <div className="p-4 border-t">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Connect</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Github size={18} />
              <span>GitHub</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>⭐</span>
              <span>Data Science Portfolio</span>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Hey, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Your Name</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl leading-relaxed">
            I transform complex data into actionable insights through statistical analysis, 
            machine learning, and compelling visualizations that drive business decisions.
          </p>
          
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              <Download size={20} />
              <span>Download Resume</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              <span>View Projects</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">94%</div>
            <div className="text-gray-600">Model Accuracy</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="text-green-600" size={24} />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">3.8</div>
            <div className="text-gray-600">GPA Score</div>
          </div>
        </div>

        {/* Journey Section */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Data Science Journey</h2>
          <p className="text-gray-600 text-lg">From curiosity to expertise in machine learning and analytics</p>
        </div>
      </div>
    </div>
  );
}