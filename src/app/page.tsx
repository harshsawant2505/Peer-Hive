'use client'
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { set } from 'mongoose';

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

//   const cardData = [
//     { Name: "TechFest", Organiser: "Tech Club", College: "IIT Bombay", members: 5000, type: "Event" },
//     { Name: "CodeCamp", Organiser: "Coders United", College: "MIT", members: 200, type: "Workshop" },
//     { Name: "Hackathon", Organiser: "Hack Club", College: "Stanford", members: 300, type: "Event" },
//     { Name: "AI Symposium", Organiser: "AI Society", College: "Harvard", members: 1500, type: "Conference" },
//     { Name: "GDSC", Organiser: "Google", College: "G.E.C", members: 60, type: "Council" },
//     { Name: "Cyber Security Club", Organiser: "CS Club", College: "Berkeley", members: 100, type: "Club" },
//     { Name: "Startup Grind", Organiser: "Entrepreneurs Club", College: "NYU", members: 350, type: "Event" },
//     { Name: "Blockchain Summit", Organiser: "Crypto Society", College: "Cambridge", members: 500, type: "Conference" },
//     { Name: "Tech Talk", Organiser: "Student Union", College: "G.E.C", members: 50, type: "Lecture" },
//     { Name: "Robotics Club", Organiser: "Mech Society", College: "IIT Delhi", members: 150, type: "Club" },
//     { Name: "Web Dev Bootcamp", Organiser: "CodeMasters", College: "UCSD", members: 75, type: "Workshop" },
//     { Name: "AI for Good", Organiser: "AI Club", College: "Georgia Tech", members: 200, type: "Organisation" },
//     { Name: "Google Developer Club", Organiser: "Google", College: "UCLA", members: 90, type: "Council" },
//     { Name: "Hack Infinity", Organiser: "Tech Club", College: "MIT", members: 800, type: "Event" },
//     { Name: "Women in Tech", Organiser: "WiTech", College: "Stanford", members: 450, type: "Organisation" },
//     { Name: "Machine Learning Meet", Organiser: "Data Society", College: "Harvard", members: 120, type: "Meetup" },
//     { Name: "Game Dev Club", Organiser: "Gaming Society", College: "UCLA", members: 40, type: "Club" },
//     { Name: "Data Science Symposium", Organiser: "DS Club", College: "Georgia Tech", members: 300, type: "Conference" },
//     { Name: "FinTech Fest", Organiser: "Finance Club", College: "NYU", members: 2000, type: "Event" },
//     { Name: "AI Research Group", Organiser: "AI Society", College: "Cambridge", members: 100, type: "Research" }
// ];

const [cardData, setCardData] = useState([])

const fetchData = async()=>{
  const res = await axios.get('/api/getEntries');

  console.log(res.data.entries);

  setCardData(res.data.entries) // set the data from the api to the cardData array
}

useEffect(()=>{
  fetchData();
},[])


  // Calculate total pages for mobile view
  const totalPages = Math.ceil(cardData.length / cardsPerPage);

  // Get current cards for mobile view
  const getCurrentCards = () => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    return cardData.slice(indexOfFirstCard, indexOfLastCard);
  };

  return (
    <div className="bg-gradient-to-tr from-black to-blue-950 w-full min-h-screen overflow-x-hidden">
      <Navbar type='' />
      
      {/* Desktop View - Keeping exactly as original */}
      <div className="flex justify-center">
        <div className="hidden lg:flex flex-wrap w-full justify-center items-center gap-5 py-8 overflow-x-hidden">
          {cardData&&cardData.map((card, index) => (
            <Card
              key={index}
              Name={card?.name}
              Organiser={card.organization}
              College={card.college}
              members={100}
              type={card.type}
              des = {card.des}
            />
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden px-4 py-6">
        {/* Mobile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {getCurrentCards().map((card, index) => (
            <div key={index} className="transform transition-transform duration-200 hover:scale-102">
              <Card
                Name={card.Name}
                Organiser={card.Organiser}
                College={card.College}
                members={card.members}
                type={card.type}
              />
            </div>
          ))}
        </div>

        {/* Mobile Pagination */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed 
                     transition-colors duration-200 hover:bg-blue-700"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <span className="text-white font-medium">
            {currentPage} / {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed 
                     transition-colors duration-200 hover:bg-blue-700"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;