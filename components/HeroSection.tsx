'use client'

import Link from "next/link";
import React from "react";

const HeroSection: React.FC = () => {


    return (
        <div
            className="hero-section relative bg-cover bg-center text-white py-20 px-4 sm:py-24 sm:px-6 lg:py-32 lg:px-8"
            style={{
                backgroundImage: `url('/hero.jpg')`
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                    Welcome to <span className="text-yellow-400">My Blogs</span>
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-lg lg:text-xl mb-8 max-w-3xl mx-auto">
                    Dive into a world of insightful articles, trending topics, and fresh ideas.
                    Explore, learn, and get inspired every day!
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {/* <Link href={'#'}>
                        <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                            View All Blogs
                        </button>
                    </Link> */}
                    <Link href={'/studio'}>
                    <button className="px-6 py-3 bg-transparent border border-white font-semibold rounded-lg hover:bg-white hover:text-black transition duration-300">
                        Start a Blog
                    </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default HeroSection;
