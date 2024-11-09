import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import React from 'react'

function Home() {

  const cardData = [
    { Name: "Hack-a-Ton", Organiser: "Coders Club", College: "G.E.C", members: 100, type: "Event" },
    { Name: "Hack-a-Ton", Organiser: "Coders Club", College: "G.E.C", members: 10, type: "Club" },
    { Name: "Hack-a-Ton", Organiser: "Coders Club", College: "G.E.C", members: 1425, type: "Organisation" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
    { Name: "Google Cloud", Organiser: "Coders Club", College: "G.E.C", members: 1, type: "Council" },
  ];

  

  return (
    <div className="bg-gradient-to-tr from-black   to-blue-950 w-full min-h-screen  overflow-x-hidden">
      <Navbar type="" />
      <div className="flex justify-center ">

        <div className="hidden lg:flex flex-wrap w-full justify-center items-center gap-5 py-8 overflow-x-hidden">
          {cardData.map((card, index) => (
        <Card
          key={index}
          Name={card.Name}
          Organiser={card.Organiser}
          College={card.College}
          members={card.members}
          type={card.type}
        />
          ))}
        </div>
      

      </div>
    </div>
  )
}

export default Home