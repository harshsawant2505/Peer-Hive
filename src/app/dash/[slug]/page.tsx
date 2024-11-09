'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Calendar, Users, MessageSquare, Menu } from 'lucide-react';

function Page({ params, searchParams }: any) {
    const unwrappedParams = React.use(params);
    const unwrappedSearch=React.use(searchParams);
    const organiser = decodeURIComponent(unwrappedParams.slug);
    // const college = searchParams.college || '';
    // const members = searchParams.members || '';
    const college=unwrappedSearch.college;
    const members=unwrappedSearch.members;
    console.log(organiser, college, members);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const [user, setUser] = useState(null);
  const [joined, setJoined] = useState<boolean>(false)

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/getUser`);
      if (response.ok) {
        const temp = await response.json();
        setUser(temp.user);
      }
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  };



  useEffect(() => {
    fetchUser();
  }, []);

  const events = [
    { date: "2024-11-15", name: "Hackathon Prep Workshop" },
    { date: "2024-11-20", name: "JavaScript Bootcamp" },
    { date: "2024-12-05", name: "Advanced React Workshop" },
    { date: "2024-12-10", name: "Cloud Technology Seminar" },
    { date: "2024-12-18", name: "LeetCode Competition" },
  ];

  const todos = [
    { title: "Meeting @6PM", description: "Discuss about budget" },
    { title: "Member Discussion", description: "AI-general members want a session on blockchain" },
    { title: "Meeting Tomorrow", description: "Plan upcoming events" },
  ];

  const Sidebar = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <MessageSquare size={20} /> Threads
        </h2>
        <div className="space-y-2">
          {['Announcements', 'Discussion'].map((item) => (
            <button
              key={item}
              className="w-full text-left px-4 py-2 text-gray-300 hover:bg-blue-500/20 rounded-lg transition"
            >
              {item}
            </button>
          ))}
         
        </div>
      </div>
    </div>
  );

  return (
    <></>
  );
}

export default Page;