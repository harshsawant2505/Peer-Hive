'use client'
import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();

  // Scrolls down by 100vh when called
  const handleLearnMore = () => {
    window.scrollTo({
      top: window.innerHeight, // Scroll 100vh
      behavior: 'smooth', // Smooth scroll animation
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden relative">
      {/* Header */}
      <header className="relative container mx-auto px-4 py-8">
        <nav className="flex absolute w-[90%] justify-between items-center mb-16">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            PEER HIVE
          </div>
          <div className="hidden md:flex gap-6">
            <Button
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
              onClick={() => router.push('/login')}
            >
              Sign Up
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row justify-around items-center gap-12 py-12 min-h-screen">
          <div className="md:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-6xl font-bold mb-10 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Discover and Join Student Clubs That Matter
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Connect with like-minded students, explore your interests, and make your college experience unforgettable.
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all"
                onClick={() => router.push('/login')}
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-black hover:border-gray-600 transform hover:scale-105 transition-all"
                onClick={handleLearnMore} // Scrolls down by 100vh
              >
                Learn More <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="animate-float">
            <img
              src="/studentImage.jpeg"
              alt="Students collaborating"
              className="rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 w-[50vw] md:w-[25vw]"
            />
          </div>
        </div>
      </header>

      {/* About Section */}
      <div className="min-h-screen bg-gray-900 text-gray-100 flex justify-around items-center gap-10">
        <div className="animate-float">
          <img
            src="/wasedaBoys.jpeg"
            alt="Students collaborating"
            className="rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 w-[50vw] md:w-[25vw]"
          />
        </div>
        <div className="md:max-w-[50vw]">
          <div className="flex flex-col gap-4">
            <h1 className="text-6xl font-extrabold">About Us</h1>
            <p className="md:max-w-[40vw] text-xl">
              PeerHive is a platform that connects students with clubs and organizations that match their interests. It&apos;s a place where students can explore their passions, meet like-minded individuals, and make their college experience unforgettable.
            </p>
          </div>
          <div className="flex gap-5 py-4 flex-wrap">
            <div className="border border-white w-[350px] h-fit p-3 lg:p-4 rounded-xl">
              <p className="text-xl font-bold"><span className="text-[#7F00FF]">Ease</span> of Joining</p>
              <p>Our club platform is designed to be accessible and user-friendly for students of all backgrounds. New members can easily join and stay updated without prior technical knowledge.</p>
            </div>
            <div className="border border-white w-[350px] h-fit p-3 lg:p-4 rounded-xl">
              <p className="text-xl font-bold"><span className="text-[#7F00FF]">Community</span> Engagement</p>
              <p>Stay connected with other members through our streamlined communication tools. From event announcements to project updates, staying engaged has never been easier.</p>
            </div>
            <div className="border border-white w-[350px] h-fit p-3 lg:p-4 rounded-xl">
              <p className="text-xl text-[#7F00FF] font-bold">Personalized Experience</p>
              <p>Our club offers a variety of ways to get involved, from tailored events to project teams. Members can choose activities that align with their interests and goals.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2024 PeerHive. Made with 💙 for students.</p>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
