import React from 'react'

const WelcomeBanner = () => {
  return (
    <div className="w-full max-w-4xl p-8 rounded-xl border border-slate-700/80 bg-slate-900/50 backdrop-blur-lg">
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
        Welcome to the AI Learning Platform
    </h1>
    <p className="text-base md:text-lg text-slate-300">
        Create, Explore, and Master your next course with the power of AI.
    </p>
</div>
  )
}

export default WelcomeBanner



//bg-linear-to-r from-cyan-200 via-blue-400 to-indigo-600
