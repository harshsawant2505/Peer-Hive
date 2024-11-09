import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import React from 'react'

function Home() {
  return (
    <div className="bg-gradient-to-tr from-black to-blue-950 w-full min-h-screen  overflow-x-hidden">
      <Navbar />
      <div className="hidden lg:flex flex-wrap w-full justify-start items-center gap-5 p-8 overflow-x-hidden ">
        <Card Name="Hack-a-Ton" Organiser="Coders Club" College="G.E.C" members={100} type="Event"/>
        <Card Name="Hack-a-Ton" Organiser="Coders Club" College="G.E.C" members={10} type="Club"/>
        <Card Name="Hack-a-Ton" Organiser="Coders Club" College="G.E.C" members={1425} type="Organisation"/>
        <Card Name="Google Cloud" Organiser="Coders Club" College="G.E.C" members={1} type="Council"/>
      </div>
    </div>
  )
}

export default Home