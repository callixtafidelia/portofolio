// app/page.tsx
import React from 'react';
import Sidebar from '@/components/sidebar';
import {
  Download,
  ArrowRight,
  BarChart3,
  Users,
  Award,
} from 'lucide-react';

export default function Home() {
  const stats = [
    { value: '94%',  label: 'Model Accuracy',     icon: BarChart3, bg: 'bg-blue-100',   color: 'text-blue-600'   },
    { value: '15+',  label: 'Projects Completed',  icon: Users,     bg: 'bg-purple-100', color: 'text-purple-600' },
    { value: '3.8',  label: 'GPA Score',           icon: Award,     bg: 'bg-green-100',  color: 'text-green-600'  },
  ];

  return (
    <div className="h-screen bg-gray-50 flex overflow-auto">
      <Sidebar active="home" />

      <main className="flex-1 h-full overflow-y-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>⭐</span>
              <span>Data Science Portfolio</span>
            </div>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Hey, I'm{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Name
            </span>
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map(({ value, label, icon: Icon, bg, color }) => (
            <div key={label} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className={`${bg} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className={color} size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
              <div className="text-gray-600">{label}</div>
            </div>
          ))}
        </div>

        {/* Journey */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Data Science Journey</h2>
          <p className="text-gray-600 text-lg">
            From curiosity to expertise in machine learning and analytics
          </p>
        </div>
      </main>
    </div>
  );
}
