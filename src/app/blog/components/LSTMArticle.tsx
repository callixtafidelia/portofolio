//src/app/blog/lstm.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag, Brain } from "lucide-react"

export default function LSTMArticle() {
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
                  className={`inline-flex items-center bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-red-300 font-medium rounded-full mb-6 ${isMobile ? "text-xs px-3 py-1.5" : "text-sm px-4 py-2"}`}
                >
                  <Brain size={14} className="mr-2" />
                  Deep Learning
                </span>
                <h1
                  className={`font-bold mb-6 ${isMobile ? "text-2xl sm:text-3xl" : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"}`}
                >
                  <span className="text-gradient-enhanced">Time Series Forecasting with LSTM</span>
                </h1>
                <p
                  className={`text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto ${isMobile ? "text-base" : "text-base md:text-xl"}`}
                >
                  Master Long Short-Term Memory networks for accurate time series predictions in financial markets, 
                  business analytics, and real-world forecasting applications.
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
                    12 min read
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
                      Time series forecasting is one of the most challenging and valuable applications in data science. 
                      Whether you're predicting stock prices, sales forecasts, or energy consumption, Long Short-Term Memory 
                      (LSTM) networks have revolutionized how we approach sequential data prediction.
                    </p>
                    <p>
                      In this comprehensive guide, we'll explore how LSTM networks solve the vanishing gradient problem 
                      of traditional RNNs, implement practical forecasting models, and apply them to real-world financial 
                      and business scenarios. You'll learn to build robust time series models that can capture complex 
                      temporal patterns and dependencies.
                    </p>
                  </div>
                </motion.section>

                <motion.section
                  id="understanding-lstm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Understanding LSTM Networks
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      LSTM networks are a special type of Recurrent Neural Network (RNN) designed to learn long-term 
                      dependencies in sequential data. They solve the vanishing gradient problem through a sophisticated 
                      gating mechanism that controls information flow.
                    </p>

                    <div
                      className={`bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                    >
                      <h3
                        className={`font-bold text-white mb-3 md:mb-4 flex items-center gap-2 ${isMobile ? "text-base" : "text-base md:text-xl"}`}
                      >
                        <Brain size={20} className="text-red-400" />
                        LSTM Cell Components
                      </h3>
                      <ul
                        className={`space-y-2 md:space-y-3 text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}
                      >
                        <li className="flex items-start gap-2 md:gap-3">
                          <div
                            className={`bg-red-400 rounded-full flex-shrink-0 ${isMobile ? "w-1.5 h-1.5 mt-1.5" : "w-1.5 h-1.5 mt-1.5 md:w-2 md:h-2 md:mt-2"}`}
                          ></div>
                          <div>
                            <strong className="text-white">Forget Gate:</strong> Decides what information to discard from the cell state
                          </div>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3">
                          <div
                            className={`bg-orange-400 rounded-full flex-shrink-0 ${isMobile ? "w-1.5 h-1.5 mt-1.5" : "w-1.5 h-1.5 mt-1.5 md:w-2 md:h-2 md:mt-2"}`}
                          ></div>
                          <div>
                            <strong className="text-white">Input Gate:</strong> Determines which new information to store in the cell state
                          </div>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3">
                          <div
                            className={`bg-yellow-400 rounded-full flex-shrink-0 ${isMobile ? "w-1.5 h-1.5 mt-1.5" : "w-1.5 h-1.5 mt-1.5 md:w-2 md:h-2 md:mt-2"}`}
                          ></div>
                          <div>
                            <strong className="text-white">Cell State:</strong> The internal memory that flows through the network
                          </div>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3">
                          <div
                            className={`bg-red-400 rounded-full flex-shrink-0 ${isMobile ? "w-1.5 h-1.5 mt-1.5" : "w-1.5 h-1.5 mt-1.5 md:w-2 md:h-2 md:mt-2"}`}
                          ></div>
                          <div>
                            <strong className="text-white">Output Gate:</strong> Controls which parts of the cell state to output
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  id="data-preparation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Data Preparation for Time Series
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      Proper data preparation is crucial for LSTM success. Time series data requires special handling 
                      to create sequences that the network can learn from effectively.
                    </p>

                    <div className="grid gap-3 md:gap-4">
                      <div
                        className={`bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                          Step 1: Normalization
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}>
                          Scale your data to help the LSTM converge faster and avoid exploding gradients.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                          Step 2: Sequence Creation
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}>
                          Transform your time series into supervised learning sequences with lookback windows.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                          Step 3: Train/Test Split
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}>
                          Use temporal splitting to preserve the chronological order of your data.
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
                    Implementation with TensorFlow/Keras
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      Here's a complete implementation of an LSTM model for time series forecasting:
                    </p>

                    <div
                      className={`bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-x-auto ${isMobile ? "p-3" : "p-3 md:p-6"}`}
                    >
                      <pre className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                        <code>{`import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import matplotlib.pyplot as plt

# Load and prepare data
def create_sequences(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:(i + seq_length)])
        y.append(data[i + seq_length])
    return np.array(X), np.array(y)

# Example with stock price data
df = pd.read_csv('stock_prices.csv')
data = df['close'].values.reshape(-1, 1)

# Normalize the data
scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(data)

# Create sequences
seq_length = 60  # 60 days lookback
X, y = create_sequences(scaled_data, seq_length)

# Split data
train_size = int(0.8 * len(X))
X_train, X_test = X[:train_size], X[train_size:]
y_train, y_test = y[:train_size], y[train_size:]

# Build LSTM model
model = Sequential([
    LSTM(50, return_sequences=True, input_shape=(seq_length, 1)),
    Dropout(0.2),
    LSTM(50, return_sequences=False),
    Dropout(0.2),
    Dense(25),
    Dense(1)
])

model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# Train the model
history = model.fit(
    X_train, y_train,
    batch_size=32,
    epochs=100,
    validation_data=(X_test, y_test),
    verbose=1
)

# Make predictions
predictions = model.predict(X_test)
predictions = scaler.inverse_transform(predictions)
y_test_actual = scaler.inverse_transform(y_test.reshape(-1, 1))

# Evaluate performance
from sklearn.metrics import mean_squared_error, mean_absolute_error
mse = mean_squared_error(y_test_actual, predictions)
mae = mean_absolute_error(y_test_actual, predictions)

print(f"MSE: {mse:.2f}")
print(f"MAE: {mae:.2f}")`}</code>
                      </pre>
                    </div>

                    <div
                      className={`bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                    >
                      <h4 className={`font-bold text-white mb-2 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                        🔧 Model Architecture Tips
                      </h4>
                      <ul
                        className={`space-y-1.5 md:space-y-2 text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm md:text-base"}`}
                      >
                        <li>• Use multiple LSTM layers for complex patterns</li>
                        <li>• Add dropout layers to prevent overfitting</li>
                        <li>• Experiment with different sequence lengths</li>
                        <li>• Consider bidirectional LSTMs for better context</li>
                      </ul>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  id="applications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Real-World Applications
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}>
                      LSTM networks excel in various time series forecasting scenarios across different industries:
                    </p>

                    <div className={`grid gap-3 md:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                      <div
                        className={`bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4
                          className={`font-bold text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                        >
                          Financial Markets
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                          Stock price prediction, currency exchange rates, and cryptocurrency forecasting with high-frequency data.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-br from-blue-500/10 to-sky-500/10 border border-blue-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4
                          className={`font-bold text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                        >
                          Supply Chain
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                          Demand forecasting, inventory optimization, and logistics planning for efficient operations.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4
                          className={`font-bold text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                        >
                          Energy & Utilities
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                          Power consumption forecasting, renewable energy prediction, and grid optimization.
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl ${isMobile ? "p-4" : "p-4 md:p-6"}`}
                      >
                        <h4
                          className={`font-bold text-white mb-2 md:mb-3 ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                        >
                          Healthcare
                        </h4>
                        <p className={`text-gray-300 ${isMobile ? "text-xs" : "text-xs md:text-sm"}`}>
                          Patient monitoring, epidemic modeling, and medical device sensor data analysis.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  id="conclusion"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className={`glow-card rounded-xl md:rounded-2xl ${isMobile ? "p-4" : "p-4 md:p-6 lg:p-8"}`}
                >
                  <h2 className={`font-bold text-white mb-4 md:mb-6 ${isMobile ? "text-xl" : "text-xl md:text-3xl"}`}>
                    Conclusion
                  </h2>
                  <div
                    className={`space-y-3 md:space-y-4 text-gray-300 leading-relaxed ${isMobile ? "text-sm" : "text-sm md:text-lg"}`}
                  >
                    <p>
                      LSTM networks have revolutionized time series forecasting by enabling models to learn complex 
                      temporal dependencies that traditional methods struggle with. Their ability to selectively 
                      remember and forget information makes them particularly powerful for financial and business applications.
                    </p>
                    <p>
                      As you implement LSTM models in your projects, remember that success depends heavily on proper 
                      data preprocessing, appropriate architecture design, and careful hyperparameter tuning. Start 
                      with simple models and gradually increase complexity as needed.
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