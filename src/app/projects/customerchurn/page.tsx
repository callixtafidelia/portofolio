// src/app/projects/customerchurn/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import {
  ArrowLeft,
  Code,
  ExternalLink,
  Github,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Database,
  Brain,
  LineChart,
  Zap,
  CheckCircle,
} from "lucide-react";

export default function CustomerChurnPage() {
  const [activeTab, setActiveTab] = useState<"overview"|"problem"|"methodology"|"results"|"code">("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "methodology", label: "Methodology" },
    { id: "results", label: "Results" },
    { id: "code", label: "Code" },
  ] as const;

  const keyMetrics = [
    { value: "94%", label: "Accuracy", color: "text-blue-600" },
    { value: "92%", label: "Precision", color: "text-green-600" },
    { value: "89%", label: "Recall", color: "text-purple-600" },
  ];

  const achievements = [
    { metric: "Accuracy Improvement", value: "15%", change: "+15%" },
    { metric: "Early Warning Precision", value: "92%", change: "+12%" },
    { metric: "Customer Risk Assessment", value: "94%", change: "+18%" },
    { metric: "F1 Score", value: "90.7%", change: "+14%" },
  ];

  const technicalMetrics = [
    { metric: "Precision", value: "92%" },
    { metric: "Recall", value: "89%" },
    { metric: "F1-Score", value: "90.7%" },
    { metric: "AUC-ROC", value: "96.2%" },
  ];

  return (
    <div className="h-screen bg-gray-50 flex overflow-auto">
      <Sidebar active="projects" />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Link
              href="/projects"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Customer Churn Prediction
                </h1>
                <p className="text-gray-600 max-w-3xl">
                  Machine learning model to predict customer churn using ensemble
                  methods with 94% accuracy.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors">
                  <Code className="w-4 h-4 mr-2" />
                  View Code
                </button>
                <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {activeTab === "overview" && (
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Project Overview
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                This project focuses on predicting customer churn for a
                telecommunications company using advanced machine learning
                techniques. Customer churn prediction is crucial for businesses
                to identify customers who are likely to cancel their
                subscriptions or stop purchasing to take preventive actions and
                reduce revenue loss.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {keyMetrics.map((m, i) => (
                  <div
                    key={i}
                    className="text-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className={`text-3xl font-bold ${m.color} mb-1`}>
                      {m.value}
                    </div>
                    <div className="text-sm text-gray-600">{m.label}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "problem" && (
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Problem Statement
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                A telecommunications company was struggling with customer
                retention. Acquiring new customers costs 5–10x more than
                retaining existing ones. The company needed a reliable way to
                identify customers at risk of churning to implement targeted
                retention strategies and reduce revenue loss.
              </p>
              <ul className="space-y-3 ml-4 list-disc text-gray-700">
                <li>High customer acquisition costs compared to retention</li>
                <li>Lack of early warning system for potential churners</li>
                <li>
                  Reactive rather than predictive approach to customer retention
                </li>
              </ul>
            </section>
          )}

          {activeTab === "methodology" && (
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
              <div className="flex items-center mb-4">
                <Brain className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Methodology
                </h2>
              </div>
              <div className="space-y-6">
                {/* Data Collection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-2">
                    <Database className="w-4 h-4 mr-2" />
                    Data Collection & Preprocessing
                  </h3>
                  <ul className="ml-6 space-y-2 text-gray-700 list-disc">
                    <li>Collected customer demographics, usage, billing</li>
                    <li>Cleaned data, handled outliers & missing values</li>
                    <li>Normalized numerical features via StandardScaler</li>
                    <li>One-hot encoded categorical features</li>
                  </ul>
                </div>
                {/* Feature Engineering */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-2">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Feature Engineering
                  </h3>
                  <ul className="ml-6 space-y-2 text-gray-700 list-disc">
                    <li>Created engagement scores from usage patterns</li>
                    <li>Modeled seasonality and trend features</li>
                    <li>Selected features via correlation analysis</li>
                  </ul>
                </div>
                {/* Model Development */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-2">
                    <Zap className="w-4 h-4 mr-2" />
                    Model Development
                  </h3>
                  <ul className="ml-6 space-y-2 text-gray-700 list-disc">
                    <li>Tested XGBoost, Random Forest, Logistic Regression</li>
                    <li>Final model: XGBoost with hyperparameter tuning</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {activeTab === "results" && (
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <LineChart className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Results & Impact
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                The XGBoost model achieved 94% accuracy, enabling targeted
                campaigns that reduced churn by 23% and boosted CLV significantly.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Key Achievements
                  </h3>
                  <div className="space-y-3">
                    {achievements.map((a, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-700">
                          {a.metric}
                        </span>
                        <div className="flex items-center">
                          <span className="font-semibold text-gray-900 mr-2">
                            {a.value}
                          </span>
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                            {a.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Technical Metrics
                  </h3>
                  <div className="space-y-3">
                    {technicalMetrics.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-700">
                          {m.metric}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "code" && (
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Code className="w-5 h-5 text-gray-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Code & Resources
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="#" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <Code className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-900">View Code</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </Link>
                <Link href="#" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <ExternalLink className="w-5 h-5 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-900">Live Demo</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
