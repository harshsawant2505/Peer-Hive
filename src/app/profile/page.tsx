"use client";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Email from "next-auth/providers/email";

function Page() {
    const { data: token, status } = useSession();
    const [user, setUser] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            
            try {

                const response = await axios.get("/api/getUser");
                setUser(response.data.user);
                setIsLoading(false);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get("/api/auth/logout");
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-800 to-black">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 w-full mt-0 overflow-y-hidden">
            <Navbar type="not-fixed" />
            <Toaster />
            <div className="sm:px-16 px-5 flex flex-col gap-10 bg-transparent rounded-xl min-h-screen mb-10 mt-12">
                <div className="bg-black relative shadow-5xl shadow-white/20 rounded-xl h-fit sm:min-h-[200px] pb-20 z-0 w-full">
                    <div className="absolute top-0 left-0 sm:h-40 h-40 w-full bg-[url('/assets/background.png')] opacity-100 rounded-t-xl"></div>

                    <div className="h-fit flex-wrap pt-24 pl-4 flex gap-10 z-20">
                        <div className="z-20  h-48 w-48 lg:h-76 lg:w-76 rounded-full border border-white">
                            <img
                                className="h-full w-full object-cover rounded-full"
                                src={user.profilePic}  
                                alt=""
                            />
                        </div>

                        <div className="text-white sm:w-[72%] w-full flex sm:flex-row flex-col sm:mt-24 sm:items-center items-start sm:justify-between bg-transparent">
                            <div className="flex flex-col justify-start">
                                <p className="text-4xl flex items-center text-white font-bold">
                                    {user.name}
                                </p>
                                <p className="text-white">{user.email}</p>
                            </div>

                            <div className="sm:w-40 mt-4 w-fit h-full flex sm:flex-col flex-row justify-center sm:items-start items-center">
                                <button
                                    type="button"
                                    onClick={() => {
                                        status === "authenticated" ? signOut() : handleLogout();
                                        router.push("/login");
                                    }}
                                    className="sm:mt-11 order-1 mr-6 w-20 sm:mr-0 sm:w-28 text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5 me-2 sm:mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 h-11"
                                >
                                    LogOut
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            <div  className="text-white bg-black to-black shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-xl py-6">
            <div className=" ml-6 p-3">
              <p className="text-xl  flex items-center gap-3 text-white font-bold">
                Clubs joined
              
              </p>
              <hr className="w-[100%] opacity-25 " />
              <div className="mt-5">
                <p className="text-white opacity-80">{user.name}</p>
              </div>
            </div>
          </div>
            <div  className="text-white bg-black to-black shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-xl py-6">
            <div className=" ml-6 p-3">
              <p className="text-xl  flex items-center gap-3 text-white font-bold">
                Clubs Created
              
              </p>
              <hr className="w-[100%] opacity-25 " />
              <div className="mt-5">
                <p className="text-white opacity-80">{user.name}</p>
              </div>
            </div>
          </div>
            </div>
        </div>
    );
}

export default Page;
