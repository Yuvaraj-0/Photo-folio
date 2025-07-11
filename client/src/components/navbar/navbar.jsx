import React from 'react'

const navbar = () => {
  return (
   <>
   <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <div className="text-xl font-bold tracking-tight">
          <Link to="/">Photographic</Link>
        </div>
        <div className="flex gap-6">
          <Link to="/" className="text-gray-700 hover:text-pink-500 font-medium transition">Home</Link>
          <Link to="/portfolio" className="text-gray-700 hover:text-pink-500 font-medium transition">Portfolio</Link>
        </div>
      </nav></>
  )
}

export default navbar