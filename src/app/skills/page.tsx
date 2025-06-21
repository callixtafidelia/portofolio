// src/app/skills/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import {
  ArrowLeft,
  Code,
  Brain,
  BarChart3,
  TrendingUp,
  Database,
  Cloud,
  Star,
  Award,
  Target,
} from "lucide-react";

export default function SkillsPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  const categories = [
    {
      id: "prog",
      title: "Programming Languages",
      Icon: Code,
      skills: [
        { name: "Python", level: "Advanced", color: "green" },
        { name: "R", level: "Intermediate", color: "blue" },
        { name: "SQL", level: "Advanced", color: "green" },
        { name: "JavaScript", level: "Intermediate", color: "blue" },
      ],
    },
    {
      id: "ml",
      title: "Machine Learning",
      Icon: Brain,
      skills: [
        { name: "Scikit-learn", level: "Advanced", color: "green" },
        { name: "TensorFlow", level: "Intermediate", color: "blue" },
        { name: "PyTorch", level: "Intermediate", color: "blue" },
        { name: "XGBoost", level: "Advanced", color: "green" },
        { name: "Random Forests", level: "Advanced", color: "green" },
        { name: "Neural Networks", level: "Intermediate", color: "blue" },
      ],
    },
    {
      id: "viz",
      title: "Data Visualization",
      Icon: BarChart3,
      skills: [
        { name: "Matplotlib", level: "Advanced", color: "green" },
        { name: "Seaborn", level: "Advanced", color: "green" },
        { name: "Plotly", level: "Intermediate", color: "blue" },
        { name: "Tableau", level: "Intermediate", color: "blue" },
        { name: "Power BI", level: "Basic", color: "gray" },
      ],
    },
    {
      id: "stats",
      title: "Statistical Analysis",
      Icon: TrendingUp,
      skills: [
        { name: "Hypothesis Testing", level: "Advanced", color: "green" },
        { name: "Regression Analysis", level: "Advanced", color: "green" },
        { name: "Time Series", level: "Intermediate", color: "blue" },
        { name: "A/B Testing", level: "Intermediate", color: "blue" },
        { name: "Bayesian Stats", level: "Basic", color: "gray" },
      ],
    },
    {
      id: "db",
      title: "Big Data & Databases",
      Icon: Database,
      skills: [
        { name: "Pandas", level: "Advanced", color: "green" },
        { name: "Spark", level: "Basic", color: "gray" },
        { name: "Hadoop", level: "Basic", color: "gray" },
        { name: "PostgreSQL", level: "Intermediate", color: "blue" },
        { name: "MongoDB", level: "Basic", color: "gray" },
      ],
    },
    {
      id: "cloud",
      title: "Cloud & Tools",
      Icon: Cloud,
      skills: [
        { name: "Jupyter", level: "Advanced", color: "green" },
        { name: "Git", level: "Intermediate", color: "blue" },
        { name: "Docker", level: "Basic", color: "gray" },
        { name: "AWS", level: "Intermediate", color: "blue" },
        { name: "GCP", level: "Basic", color: "gray" },
        { name: "Streamlit", level: "Intermediate", color: "blue" },
      ],
    },
  ];

  const levelIcon = (lvl: string) => {
    if (lvl === "Advanced") return <Star className="w-3 h-3" />;
    if (lvl === "Intermediate") return <Award className="w-3 h-3" />;
    return <Target className="w-3 h-3" />;
  };

  const colorClasses = (c: string) => {
    switch (c) {
      case "green":
        return "bg-green-100 text-green-800 border-green-200";
      case "blue":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const all = categories.flatMap((cat) => cat.skills);
  const stats = {
    total: all.length,
    advanced: all.filter((s) => s.level === "Advanced").length,
    intermediate: all.filter((s) => s.level === "Intermediate").length,
    basic: all.filter((s) => s.level === "Basic").length,
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-auto">
      <Sidebar active="skills" />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto mb-8">
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Technical Skills
          </h1>
          <p className="text-gray-600">
            My expertise in data science and machine learning
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Skills", value: stats.total, color: "blue" },
            { label: "Advanced", value: stats.advanced, color: "green" },
            {
              label: "Intermediate",
              value: stats.intermediate,
              color: "blue",
            },
            { label: "Basic", value: stats.basic, color: "gray" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center"
            >
              <div
                className={`text-2xl font-bold text-${color}-600 mb-1`}
              >
                {value}
              </div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          ))}
        </div>

        {/* Categories & Skills */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {categories.map(({ id, title, Icon, skills }) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Icon className="w-5 h-5 text-gray-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => {
                  const key = `${id}-${i}`;
                  return (
                    <div
                      key={key}
                      onMouseEnter={() => setHovered(key)}
                      onMouseLeave={() => setHovered(null)}
                      className={`
                        inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border
                        ${colorClasses(s.color)}
                        ${hovered === key ? "transform scale-105 shadow-md" : "hover:shadow-sm"}
                        transition-all duration-200 cursor-default
                      `}
                    >
                      <span className="mr-1.5">
                        {levelIcon(s.level)}
                      </span>
                      <span className="mr-2">{s.name}</span>
                      <span className="text-xs opacity-75">{s.level}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Proficiency Levels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-3 bg-green-50 rounded-md border border-green-200">
              <Star className="w-4 h-4 text-green-600 mr-3" />
              <div>
                <div className="font-medium text-green-800">Advanced</div>
                <div className="text-sm text-green-600">
                  Expert level, can teach others
                </div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-md border border-blue-200">
              <Award className="w-4 h-4 text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-blue-800">Intermediate</div>
                <div className="text-sm text-blue-600">
                  Proficient, comfortable using
                </div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-200">
              <Target className="w-4 h-4 text-gray-600 mr-3" />
              <div>
                <div className="font-medium text-gray-700">Basic</div>
                <div className="text-sm text-gray-600">
                  Familiar, can work with guidance
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Goals */}
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Currently Learning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Deep Learning (PyTorch)",
                desc: "Advancing from intermediate to advanced",
              },
              {
                title: "MLOps & Deployment",
                desc: "Docker, Kubernetes, model serving",
              },
              { title: "Apache Spark", desc: "Big data processing" },
              {
                title: "Cloud Architecture",
                desc: "AWS/GCP data engineering",
              },
            ].map((goal, i) => (
              <div
                key={i}
                className="flex items-center p-3 bg-yellow-50 rounded-md border border-yellow-200"
              >
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                <div>
                  <div className="font-medium text-gray-900">
                    {goal.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {goal.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
