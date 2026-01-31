import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-50 via-rose-50 to-pink-50 backdrop-blur-md text-gray-800 px-6 py-12 border-t border-orange-100">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        
        {/* Brand */}
        <div>
          <h1 className="text-3xl font-extrabold text-orange-500">
            <span className="text-orange">Recipe</span>
            <span className="text-[#4ade80]">Hub</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Discover. Cook. Enjoy.
          </p>
        </div>

        {/* Accent line */}
        <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-pink-500 mx-auto rounded-full"></div>

        {/* Credits */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            Made with <span className="text-red-500">❤️</span> {" "}
            <span className="font-semibold text-gray-800">
              
            </span>
          </p>
          <p>India © 2026</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




