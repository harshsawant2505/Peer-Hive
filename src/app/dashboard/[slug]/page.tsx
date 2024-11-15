"use client";
import React, { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import BudgetInput from "@/components/BudgetInput";
import {toast, Toaster } from "react-hot-toast";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Calendar,
  Users,
  CheckSquare,
  Activity,
  Plus,
  FileText,
  MessageSquare,
  Menu,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import IssueDrawer from "@/components/IssueDrawer";

function Page({ params, searchParams }: any) {
  const router = useRouter()
  const unwrappedParams = React.use(params);
  const unwrappedSearch = React.use(searchParams);
  const organiser = decodeURIComponent(unwrappedParams.slug);

  const college = unwrappedSearch.college;
  
  const owner = unwrappedSearch.owner;
  const name = unwrappedSearch.name;

  const [username, setUsername] = useState<string>("");
  const [members, setMembers] = useState<number>(0);
  console.log(organiser, college, members, owner);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  

  const [isBudgetSet, setIsBudgetSet] = useState<boolean>(false);
  const [budget, setBudget] = useState<number>(0);

  const [user, setUser] = useState(null);
  const [joined, setJoined] = useState<boolean>(false);
  useEffect(() => {
  },[joined])

  const fetchUser = async () => {
    try {
      console.log("====>>>>",name);
      const response = await fetch(`/api/getUser`);
      const memberRes=await axios.post(`/api/getMemberCount`, {name:name});
      console.log("This is count ====>>>>",memberRes.data.value);
      setMembers(memberRes.data.value)

      if (response.ok) {
        const temp = await response.json();
        setUser(temp.user);
        setUsername(temp.user.name)
        if (temp.user?.memberOf.includes(name)) {
          console.log("SUCCESS");
          toast.success("You are a member of this club");
          setJoined(true);
        } else {
          console.log("FAILURE");
        }
      }

    } catch (error) {
      console.log("Failed to fetch user", error);
    }
  };

  const setUserMemberOf = async () => {
    try {
      const res = await axios.post('/api/updateUserMemberOf', { email: user?.email, name: name,joined:joined });
      if (!res.data.success) {
        console.log("Error appending user memberOf");
      }else{
        console.log(res,user);
      }
    } catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    console.log('this is that',name, user)
    fetchUser();
    console.log('this is that',name, user)
    console.log("ENTERED");
    if (user?.budget > 0) {
      setIsBudgetSet(true);
      setBudget(user?.budget);
    }
    else {
      setIsBudgetSet(false);
      setBudget(0);
    }
  
   
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
    {
      title: "Member Discussion",
      description: "AI-general members want a session on blockchain",
    },
    { title: "Meeting Tomorrow", description: "Plan upcoming events" },
  ];

  const SidebarPresident = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <MessageSquare size={20} /> Threads
        </h2>
        <div className="space-y-2">
          {["Announcements", "Management", "Discussion"].map((item) => (
            <button
              key={item}
              className="w-full text-left  px-4 py-2 text-gray-300 hover:bg-blue-500/20 rounded-lg transition"
              onClick={()=>{
                console.log(item)
                if(item=='Discussion'){
                  console.log('discussion')
                  router.push(`/discussion?id=${organiser}`)
                }
              }}
            >
              {item}
            </button>
          ))}
          <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition">
            <div size={16} /> New Thread
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FileText size={20} /> Tools
        </h2>
        <div className="space-y-2">
          {[
            "Generate POA",
            "Collect Issues",
            "Schedule Meeting",
            "Schedule Announcement",
          ].map((item) =>item == "Collect Issues"?<IssueDrawer organiser = {organiser} key={item}/>: (

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
  const SidebarNormal = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <MessageSquare size={20} /> Threads
        </h2>
        <div className="space-y-2">
          {["Announcements", "Management", "Discussion"].map((item) => (
            <button
              key={item}
              className="w-full text-left px-4 py-2 text-gray-300 hover:bg-blue-500/20 rounded-lg transition"
              onClick={()=>{
                console.log(item)
                if(item=='Discussion'){
                  console.log('discussion')
                  router.push(`/discussion?id=${organiser}`)
                }
              }}
            >
              {item}
            </button>
          ))}
          <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition">
            <div size={16} /> New Thread
          </button>
        </div>
      </div>


    </div>
  );
  if (user?.email === owner) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-black   to-blue-950">
        <Navbar type="" />
        <Toaster/>
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="p-3 bg-blue-600 text-white rounded-full shadow-lg"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-slate-900 text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-white">Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <SidebarPresident />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Header Section */}
        <div className="container mx-auto p-4 lg:p-6">
          <Card className="bg-slate-800/50 border-none text-white">
            <CardContent className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 lg:p-6 gap-4">
              <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6 w-full lg:w-auto">
                <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden">
                  <Image
                    src="/rectangle5.png"
                    fill
                    className="object-cover"
                    alt="Club Photo"
                  />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {name}
                  </h1>
                  <div className="text-lg lg:text-xl text-gray-300">
                    {organiser}
                  </div>
                  <div className="text-lg lg:text-xl text-gray-300">
                    {college}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <Users size={16} /> {members} members
                  </div>
                </div>

              </div>
              <div className="flex flex-col gap-3 w-full lg:w-auto">
                <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg px-4 lg:px-6 py-2 border border-blue-500/30">
                  <div className="text-lg lg:text-xl font-semibold">
                    Role: President
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 lg:flex-none bg-blue-800 hover:bg-blue-900 transition px-4 py-2 rounded-lg text-sm">
                    Manage Events
                  </button>
                  <BudgetInput isBudgetSet={isBudgetSet} budget={budget} setBudget={setBudget} setIsBudgetSet={setIsBudgetSet} name={name} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mt-4 lg:mt-6">
            {/* Sidebar - Hidden on mobile, shown in Sheet */}
            <Card className="hidden lg:block lg:col-span-3 bg-slate-800/50 border-none text-white">
              <CardContent className="p-4">
                <SidebarPresident />
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="lg:col-span-6 space-y-4 lg:space-y-6">
              {/* Todo Section */}
              <Card className="bg-slate-800/50 border-none text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare size={20} /> To-Do List
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {todos.map((todo, index) => (
                      <div
                        key={index}
                        className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30"
                      >
                        <h3 className="font-semibold">{todo.title}</h3>
                        <div className="text-gray-300 text-sm">
                          {todo.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team Members */}
              <Card className="bg-slate-800/50 border-none text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users size={20} /> Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { role: "President", name: `${username}` },
                      { role: "Vice President", name: "Chinmay" },
                      { role: "Chairman", name: "Harsh Sawant" },
                      { role: "Treasurer", name: "Harsh Sawant" },
                      { role: "Web Dev Lead", name: "Harsh Sawant" },
                      { role: "Cloud Lead", name: "Chinmay" },
                      { role: "ML Lead", name: "Kedron" },
                    ].map((member, index) => (
                      <div
                        key={index}
                        className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-3 border border-blue-500/20"
                      >
                        <div className="text-gray-300 text-sm">{member.role}</div>
                        <div className="font-semibold">{member.name}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 space-y-4 lg:space-y-6">
              {/* Calendar */}
              <Card className="bg-slate-800/50 border-none text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar size={20} /> Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {events.map((event) => (
                      <div
                        key={event.date}
                        className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30"
                      >
                        <div className="text-sm text-gray-300">
                          {formatDate(event.date)}
                        </div>
                        <div className="font-semibold">{event.name}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="bg-slate-800/50 border-none text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity size={20} /> Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
                      Report on recent survey available
                    </div>
                    <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
                      Report on recent polls available
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 transition rounded-lg p-2">
                        Request Change in members
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button className="bg-blue-500/20 hover:bg-blue-500/30 transition rounded-lg p-2">
                          Raise Petition
                        </button>
                        <button className="bg-blue-500/20 hover:bg-blue-500/30 transition rounded-lg p-2">
                          Raise Request
                        </button>
                        <button className="bg-blue-500/20 hover:bg-blue-500/30 transition rounded-lg p-2">
                          Raise Issues
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-black   to-blue-950 z-0">
        <div className='z-10'><Navbar type="" /><Toaster/></div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed bottom-4 right-4 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-3 bg-blue-600 text-white rounded-full shadow-lg" aria-label="Open menu">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-slate-900 text-white">
              <SheetHeader>
                <SheetTitle className="text-white">Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 ">
                <SidebarNormal />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Header Section */}
        <div className="container mx-auto p-4 lg:p-6">
          <Card className="bg-slate-800/50 border-none text-white">
            <CardContent className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 lg:p-6 gap-4">
              <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6 w-full lg:w-auto">
                <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden z-1">
                  <Image
                    src="/rectangle5.png"
                    fill
                    className="object-cover z-1"
                    alt="Club Photo"
                  />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {name}
                  </h1>
                  <div className="text-lg lg:text-xl text-gray-300">{organiser}</div>
                  <div className="text-lg lg:text-xl text-gray-300">{college}</div>
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <Users size={16} /> {members} members
                  </div>
                </div>
                {joined ? <button className='bg-red-500 w-20 px-2 py-1 rounded-lg' onClick={() => setUserMemberOf()}>Exit</button> :
                  <button className='bg-green-500 w-20 px-2 py-1 rounded-lg' onClick={() => setUserMemberOf()}>Join</button>}
              </div>
              <div className="flex flex-col gap-3 w-full lg:w-auto">

                <div className="flex gap-3">

                  <button className="flex-1 lg:flex-none bg-emerald-600 hover:bg-emerald-700 transition px-4 py-2 rounded-lg text-sm">
                    View Budget
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mt-4 lg:mt-6">
            {/* Sidebar - Hidden on mobile, shown in Sheet */}
            <Card className="hidden lg:block h-fit min-h-[40vh] lg:col-span-3 bg-slate-800/50 border-none text-white">
              <CardContent className="p-4">
                <SidebarNormal />
              </CardContent>
              <Card className="bg-slate-800/50 border-none text-white m-4">
                <CardContent>
                  <div className="py-6">
                    <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 transition rounded-lg p-2">
                        Request Change in members
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button className="bg-blue-500/20 hover:bg-blue-500/30 transition rounded-lg p-2">
                          Raise Petition
                        </button>
                        <button className="bg-blue-500/20 hover:bg-blue-500/30 transition rounded-lg p-2">
                          Raise Request
                        </button>
                        <button className="bg-blue-500/20 hover:bg-blue-500/30 transition rounded-lg p-2">
                          Raise Issues
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Card>

            {/* Main Content */}
            <div className="lg:col-span-6 space-y-4 lg:space-y-6">



              {/* Team Members */}
              <Card className="bg-slate-800/50 border-none text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users size={20} /> Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { role: 'President', name: 'You' },
                      { role: 'Vice President', name: 'Chinmay' },
                      { role: 'Chairman', name: 'Harsh Sawant' },
                      { role: 'Treasurer', name: 'Harsh Sawant' },
                      { role: 'Web Dev Lead', name: 'Harsh Sawant' },
                      { role: 'Cloud Lead', name: 'Chinmay' },
                      { role: 'ML Lead', name: 'Kedron' },
                    ].map((member, index) => (
                      <div
                        key={index}
                        className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-3 border border-blue-500/20"
                      >
                        <div className="text-gray-300 text-sm">{member.role}</div>
                        <div className="font-semibold">{member.name}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 space-y-4 lg:space-y-6">
              {/* Calendar */}
              <Card className="bg-slate-800/50 border-none text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar size={20} /> Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {events.map((event) => (
                      <div
                        key={event.date}
                        className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30"
                      >
                        <div className="text-sm text-gray-300">{formatDate(event.date)}</div>
                        <div className="font-semibold">{event.name}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}

            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Page;
