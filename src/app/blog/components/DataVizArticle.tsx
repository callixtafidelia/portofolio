//src/app/blog/dataviz.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag, BarChart3 } from "lucide-react"

export default function DataVizArticle() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  // Smooth-scrolling for in-page links
  useEffect(() => {
    const handleClick = (e: Event) => {
      e.preventDefault()
      const target = e.currentTarget as HTMLAnchorElement
      const href = target.getAttribute("href")!
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", handleClick)
    })

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", handleClick)
      })
    }
  }, [])

  return (
    <>
      {/* Enhanced Global Styles */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #0a0e1a;
          overflow-x: hidden;
        }
        
        /* Animated background gradient */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.15) 0%, transparent 50%);
          z-index: -1;
          animation: backgroundShift 20s ease-in-out infinite;
        }
        
        @keyframes backgroundShift {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes gradientShift {
          0%, 100% { 
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
          50% { 
            background-position: 100% 50%;
            filter: hue-rotate(45deg);
          }
        }
        
        .text-gradient-enhanced {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 5s ease infinite;
        }
        
        .glow-card {
          position: relative;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .glow-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(240, 147, 251, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }
        
        .glow-card:hover::before {
          opacity: 1;
        }
        
        .glow-card:hover {
          transform: translateY(-2px);
          border-color: rgba(102, 126, 234, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        /* Mobile responsive adjustments */
        @media (max-width: 1024px) {
          .glow-card:hover {
            transform: none;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        }
      `}</style>

      <div className="flex h-screen overflow-hidden bg-[#0a0e1a] text-white">
        {/* Sidebar */}
        <Sidebar active="blog" onToggle={setSidebarCollapsed} />

        {/* Main content with responsive margin and centering */}
        <main
          className="flex-1 overflow-y-auto py-8 relative transition-all duration-300 ease-in-out"
          style={{
            marginLeft: isMobile ? "0" : "40px",
          }}
        >
          <div className={`max-w-4xl mx-auto ${isMobile ? "px-4" : "px-6"}`}>
            {/* Back link */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-all duration-300 hover:translate-x-1 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Blog</span>
              </Link>
            </motion.div>

            {/* Article Content */}
            <article className="w-full">
              {/* Article Header */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-12 text-center"
              >
                <span
                  className={`inline-flex items-center bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 text-green-300 font-medium rounded-full mb-6 ${isMobile ? "text-xs px-3 py-1.5" : "text-sm px-4 py-2"}`}
                >
                  <BarChart3 size={14} className="mr-2" />
                  Data Visualization
                </span>
                <h1
                  className={`font-bold mb-6 ${isMobile ? "text-2xl sm:text-3xl" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"}`}
                >
                  <span className="text-gradient-enhanced">Data Visualization Best Practices</span>
                </h1>
                <p
                  className={`text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto ${isMobile ? "text-base" : "text-base md:text-xl"}`}
                >
                  Master the art and science of creating compelling visualizations that tell powerful stories with your data, 
                  using modern tools and evidence-based design principles.
                </p>

                {/* Article Metadata */}
                <div
                  className={`flex gap-4 md:gap-6 text-gray-400 justify-center ${isMobile ? "text-xs flex-wrap" : "text-xs flex-wrap md:text-sm"}`}
                >
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Calendar size={16} />
                    July 15, 2024
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Clock size={16} />
                    6 min read
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Tag size={16} />
                    Callixta Fidelia C
                  </div>
                </div>
              </motion.header>

              {/* Article Body */}
              <div className="space-y-8 md:space-y-12">
                <motion.section
                  id="introduction"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Introduction
                  </h2>
                  <div
                    className={`space-y-3 md:space-y-4 text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                  >
                    <p>
                      In an era where data drives decision-making, the ability to create clear, compelling visualizations 
                      has become a critical skill for data scientists and analysts. Great visualizations don't just present 
                      data—they tell stories, reveal insights, and inspire action.
                    </p>
                    <p>
                      This guide explores evidence-based principles for creating effective data visualizations that 
                      communicate clearly, engage audiences, and drive meaningful insights. From choosing the right 
                      chart types to designing for accessibility, we'll cover the essential practices that separate 
                      good visualizations from truly exceptional ones.
                    </p>
                  </div>
                </motion.section>

                <motion.section
                  id="principles"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Core Design Principles
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      Effective data visualization is built on fundamental design principles that enhance clarity, 
                      reduce cognitive load, and guide the viewer's attention to key insights.
                    </p>

                    <div
                      className={`bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                    >
                      <h3
                        className={`font-bold text-white mb-3 md:mb-4 flex items-center gap-2 ${isMobile ? "text-base" : "text-base md:text-xl"}`}
                      >
                        <BarChart3 size={20} className="text-green-400" />
                        Essential Design Principles
                      </h3>
                      <ul
                        className={`space-y-2 md:space-y-3 text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}
                      >
                        <li className="flex items-start gap-2 md:gap-3">
                          <div
                            className={`bg-green-400 rounded-full flex-shrink-0 ${isMobile ? "w-1.5 h-1.5 mt-1.5" : "w-1.5 h-1.5 mt-1.5 md:w-2 md:h-2 md:mt-2"}`}
                          ></div>
                          <div>
                            <strong className="text-white">Clarity:</strong> Make the data's meaning immediately apparent to viewers
                          </div>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3">
                          <div
                            className={`bg-emerald-400 rounded-full flex-shrink-0 ${isMobile ? "w-1.5 h-1.5 mt-1.5" : "w-1.5 h-1.5 mt-1.5 md:w-2 md:h-2 md:mt-2"}`}
                          ></div>
                          <div>
                            <strong className="text-white">Accuracy:</strong> Represent data truthfully without distortion or bias
                          </div>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3">
                          <div
                            className={`bg-teal-400 rounded-full flex-shrink-0 ${isMobile ? "w-1.5 h-1.5 mt-1.5" : "w-1.5 h-1.5 mt-1.5 md:w-2 md:h-2 md:mt-2"}`}
                          ></div>
                          <div>
                            <strong className="text-white">Efficiency:</strong> Maximize the data-to-ink ratio by removing unnecessary elements
                          </div>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3">
                          <div
                            className={`bg-green-400 rounded-full flex-shrink-0 ${isMobile ? "w-1.5 h-1.5 mt-1.5" : "w-1.5 h-1.5 mt-1.5 md:w-2 md:h-2 md:mt-2"}`}
                          ></div>
                          <div>
                            <strong className="text-white">Aesthetics:</strong> Create visually appealing designs that engage the audience
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  id="chart-selection"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Choosing the Right Chart Type
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      The choice of visualization type should be driven by your data structure and the story you want to tell. 
                      Different chart types excel at highlighting different relationships and patterns.
                    </p>

                    <div className="grid gap-3 md:gap-4">
                      <div
                        className={`bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                          Comparisons: Bar Charts & Column Charts
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}>
                          Perfect for comparing values across categories. Use horizontal bars for long category names.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                          Trends: Line Charts & Area Charts
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}>
                          Ideal for showing changes over time and identifying patterns in continuous data.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                          Relationships: Scatter Plots & Bubble Charts
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}>
                          Excellent for exploring correlations and identifying outliers in your data.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                          Distributions: Histograms & Box Plots
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}>
                          Best for understanding data distributions, quartiles, and identifying statistical outliers.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  id="implementation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Tools and Implementation
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      Modern data visualization requires choosing the right tools for your needs. Here's a practical example 
                      using Python's matplotlib and seaborn libraries:
                    </p>

                    <div
                      className={`bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-x-auto ${isMobile ? "p-3" : "p-3 md:p-6"}`}
                    >
                      <pre className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                        <code>{`import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# Set the aesthetic style
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette("husl")

# Create sample data
np.random.seed(42)
data = pd.DataFrame({
    'month': pd.date_range('2023-01', periods=12, freq='M'),
    'sales': np.random.normal(100, 20, 12).cumsum(),
    'marketing_spend': np.random.normal(50, 10, 12),
    'category': np.random.choice(['A', 'B', 'C'], 12)
})

# Create a comprehensive dashboard
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 10))
fig.suptitle('Sales Performance Dashboard', fontsize=16, fontweight='bold')

# 1. Time series line chart
ax1.plot(data['month'], data['sales'], marker='o', linewidth=2.5, markersize=6)
ax1.set_title('Sales Trend Over Time', fontweight='bold')
ax1.set_ylabel('Sales ($000s)')
ax1.tick_params(axis='x', rotation=45)
ax1.grid(True, alpha=0.3)

# 2. Scatter plot with correlation
ax2.scatter(data['marketing_spend'], data['sales'], 
           alpha=0.7, s=100, c=data.index, cmap='viridis')
ax2.set_title('Sales vs Marketing Spend', fontweight='bold')
ax2.set_xlabel('Marketing Spend ($000s)')
ax2.set_ylabel('Sales ($000s)')

# Add correlation coefficient
corr = data['sales'].corr(data['marketing_spend'])
ax2.text(0.05, 0.95, f'Correlation: {corr:.2f}', 
         transform=ax2.transAxes, bbox=dict(boxstyle="round", facecolor='white'))

# 3. Bar chart by category
category_sales = data.groupby('category')['sales'].mean()
bars = ax3.bar(category_sales.index, category_sales.values, 
               color=['#ff9999', '#66b3ff', '#99ff99'])
ax3.set_title('Average Sales by Category', fontweight='bold')
ax3.set_ylabel('Average Sales ($000s)')

# Add value labels on bars
for bar in bars:
    height = bar.get_height()
    ax3.text(bar.get_x() + bar.get_width()/2., height + 1,
             f'{height:.1f}', ha='center', va='bottom')

# 4. Distribution histogram
ax4.hist(data['sales'], bins=8, alpha=0.7, color='skyblue', edgecolor='black')
ax4.set_title('Sales Distribution', fontweight='bold')
ax4.set_xlabel('Sales ($000s)')
ax4.set_ylabel('Frequency')
ax4.axvline(data['sales'].mean(), color='red', linestyle='--', 
            label=f'Mean: {data["sales"].mean():.1f}')
ax4.legend()

plt.tight_layout()
plt.show()

# Best practices applied:
# ✓ Clear, descriptive titles
# ✓ Appropriate chart types for data
# ✓ Consistent color scheme
# ✓ Grid lines for easier reading
# ✓ Value labels where helpful
# ✓ Statistical annotations
# ✓ Proper axis labels and units`}</code>
                      </pre>
                    </div>

                    <div
                      className={`bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                    >
                      <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                        🎨 Color and Design Tips
                      </h4>
                      <ul
                        className={`space-y-1.5 md:space-y-2 text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}
                      >
                        <li>• Use color purposefully—don't just make things "pretty"</li>
                        <li>• Ensure sufficient contrast for accessibility</li>
                        <li>• Limit your color palette to 3-5 distinct colors</li>
                        <li>• Consider colorblind-friendly palettes</li>
                        <li>• Use white space effectively to reduce clutter</li>
                      </ul>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  id="common-mistakes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Common Mistakes to Avoid
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      Even experienced practitioners can fall into visualization traps that mislead audiences or obscure insights. 
                      Here are the most critical mistakes to avoid:
                    </p>

                    <div className={`grid gap-3 md:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                      <div
                        className={`bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4
                          className={`font-bold text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                        >
                          ❌ Misleading Scales
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                          Truncated y-axes, inconsistent scales, and 3D effects that distort data perception.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4
                          className={`font-bold text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                        >
                          ❌ Chart Junk
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                          Unnecessary decorations, excessive gradients, and distracting visual elements.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4
                          className={`font-bold text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                        >
                          ❌ Wrong Chart Types
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                          Using pie charts for comparisons or line charts for categorical data.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4
                          className={`font-bold text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                        >
                          ❌ Poor Color Choices
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                          Rainbow color schemes, insufficient contrast, and ignoring colorblind accessibility.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  id="advanced-techniques"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Advanced Techniques
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      Once you've mastered the fundamentals, these advanced techniques can elevate your visualizations 
                      and create more engaging, interactive experiences:
                    </p>

                    <div
                      className={`bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                    >
                      <h4 className={`font-bold text-white mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                        📊 Interactive Dashboards
                      </h4>
                      <p className={`text-gray-300 mb-3 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}>
                        Tools like Plotly Dash, Streamlit, and D3.js enable interactive exploration:
                      </p>
                      <ul className={`space-y-1 text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                        <li>• Hover effects and tooltips for additional context</li>
                        <li>• Filtering and brushing for data exploration</li>
                        <li>• Linked views that update together</li>
                        <li>• Animation for showing changes over time</li>
                      </ul>
                    </div>

                    <div
                      className={`bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                    >
                      <h4 className={`font-bold text-white mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                        🎯 Storytelling with Data
                      </h4>
                      <p className={`text-gray-300 mb-3 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}>
                        Structure your visualizations to guide the viewer through a narrative:
                      </p>
                      <ul className={`space-y-1 text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                        <li>• Start with context and end with a call to action</li>
                        <li>• Use annotations to highlight key insights</li>
                        <li>• Create a visual hierarchy with size and color</li>
                        <li>• Progressive disclosure for complex information</li>
                      </ul>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  id="conclusion"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Conclusion
                  </h2>
                  <div
                    className={`space-y-3 md:space-y-4 text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                  >
                    <p>
                      Effective data visualization is both an art and a science, requiring technical skill, design 
                      sensibility, and deep understanding of your audience's needs. By following these evidence-based 
                      practices, you'll create visualizations that not only look great but truly communicate insights 
                      and drive action.
                    </p>
                    <p>
                      Remember that the best visualization is often the simplest one that effectively answers your 
                      audience's questions. Start with clarity, add beauty thoughtfully, and always prioritize 
                      your reader's understanding over visual complexity.
                    </p>
                  </div>
                </motion.section>
              </div>
            </article>
          </div>
        </main>
      </div>
    </>
  )
}