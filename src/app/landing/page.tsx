'use client'
import React, { useState } from 'react';
import { ArrowRight, Users, Calendar, Trophy, ChevronDown, Menu, X, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
const LandingPage = () => {

  const router = useRouter();


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden relative">
      {/* Sign Up Side Panel */}

      {/* Rest of the landing page */}
      <header className="relative container mx-auto px-4 py-8">
        <nav className="flex absolute w-[90%] justify-between items-center mb-16">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            PEER HIVE
          </div>

          
          <div className="hidden md:flex gap-6 ">
          
            <Button
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
              onClick={()=>router.push('/login')}
            >
              Sign Up
            </Button>
          </div>

          <div className={`md:hidden absolute top-20 left-0 right-0 bg-gray-800 p-4 transform transition-transform duration-300 ease-in-out translate-y-0 `}>
            <div className="flex flex-col gap-4">
              
              <Button
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white w-full"
                onClick={() => router.push('/login')}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section (same as before) */}
        <div className="flex  md:flex-row justify-around items-center gap-12 py-12 min-h-screen">
          <div className=" md:w-1/2 space-y-6 animate-fade-in ">
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
              <Button variant="outline" className="border-gray-700 text-black hover:border-gray-600 transform hover:scale-105 transition-all">
                Learn More <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className=" animate-float">
            <img
              src="/studentImage.jpeg"
              alt="Students collaborating"
              className="rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-300 w-[25vw]"
            />
          </div>
        </div>
      </header>

      

     

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2024 ClubHub. Made with 💙 for students.</p>
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