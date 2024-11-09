'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");

  const colleges = ["College A", "College B", "College C", "College D"];

  return (
    <div className='bg-[#020817] min-h-screen w-full'>
      <nav className="flex absolute w-[90%] justify-between items-center mb-16 p-5">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            PEER HIVE
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
      <div className="w-full h-screen flex items-center justify-center ">
        <Card className="w-full max-w-md p-2 bg-slate-900 border-slate-800">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
            <CardDescription className="text-slate-400">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h2 className="text-slate-400">Select your college</h2>
            <select
              className="w-full h-12 p-2 border-2 border-slate-800 bg-slate-900 text-white rounded-md focus:outline-none focus:border-blue-500"
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
            >
              <option value="" disabled>Select your college</option>
              {colleges.map((college, index) => (
                <option key={index} value={college} className="bg-slate-900 text-white">
                  {college}
                </option>
              ))}
            </select>

            <h2 className="text-slate-400">Select your role</h2>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline" 
                className={`w-1/2 h-12 font-medium border-2 border-slate-800 bg-slate-900 text-white transition-colors ${selectedRole === "President" ? "bg-slate-800" : ""}`}
                onClick={() => { document.cookie = "userType=president"; router.refresh(); setSelectedRole("President"); }}
              >
                President
              </Button>
              <Button 
                variant="outline" 
                className={`w-1/2 h-12 font-medium border-2 border-slate-800 bg-slate-900 text-white transition-colors ${selectedRole === "User" ? "bg-slate-800" : ""}`}
                onClick={() => { document.cookie = "userType=user"; router.refresh(); setSelectedRole("User"); }}
              >
                User
              </Button>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-12 font-medium border-2 border-slate-800 bg-slate-900 text-white hover:bg-slate-800 hover:text-white transition-colors"
              onClick={() => {
                  signIn('google', { callbackUrl: '/' });
                  console.log("Google sign in clicked with role:", selectedRole);
                  console.log("Selected college:", selectedCollege);
              }}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>

            <div className="text-center text-sm text-slate-400">
              By continuing, you agree to our{' '}
              <a href="#" className="underline text-blue-400 hover:text-blue-300">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="underline text-blue-400 hover:text-blue-300">Privacy Policy</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
