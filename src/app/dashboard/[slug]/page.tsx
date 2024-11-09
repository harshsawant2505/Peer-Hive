import React from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Table } from 'lucide-react';

function page({ params, searchParams }:any) {
    const organiser = decodeURIComponent(params.slug);
    const college = searchParams.college || '';
    const members = searchParams.members || '';

    const events = [
        { date: "2024-11-15", name: "Hackathon Prep Workshop" },
        { date: "2024-11-20", name: "JavaScript Bootcamp" },
        { date: "2024-12-05", name: "Advanced React Workshop" },
        { date: "2024-12-10", name: "Cloud Technology Seminar" },
        { date: "2024-12-18", name: "LeetCode Competition" },
    ];

    return (
        <div className="bg-gradient-to-tr from-black to-blue-950 w-full min-h-screen overflow-x-hidden text-white">
            <Navbar />
            <div className="flex justify-between items-center p-8">
                <div className='flex justify-center items-center gap-4'>
                    <Image src={"/rectangle5.png"} width={100} height={100} alt="ClubPhoto" className="" />
                    <div>
                        <div className='text-3xl font-extrabold'>{organiser}</div>
                        <div className='text-2xl font-bold'>{college}</div>
                        <div className=''>{members} members</div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-2 text-black'>
                    <div className='bg-gray-300 rounded-xl px-4 font-bold'>Role- President</div>
                    <div className='flex w-full justify-center items-center gap-2'>
                        <div className='bg-gray-300 rounded-xl px-4 '>Events</div>
                        <div className='bg-gray-300 rounded-xl px-4 '>Budget</div>
                    </div>
                </div>
            </div>
            <div className='flex w-full gap-2'>
                <div >
                    <div>Threads</div>
                    <div>Announcements</div>
                    <div>Management</div>
                    <div>Discussion</div>
                    <div>Thread +</div>
                    <div>Tools</div>
                    <div>Generate POA</div>
                    <div>Collect Issues</div>
                    <div>Schedule Meeting</div>
                    <div>Schedule Announcement</div>
                </div>
                <div>
                    <div className="border-l-2 border-gray-300 h-full"></div>
                </div>
                <div>
                    <h1>to-do</h1>
                    <div>
                        <p>Meeting @6PM</p>
                        <p>Discuss about budget</p>
                    </div>

                    <div>
                        <p>Member Discussion </p>
                        <p>AI-general members want a session on blockchain</p>
                    </div>
                    <div>
                        <p>Meeting Tomorrow</p>
                        <p>Plan upcoming events</p>
                    </div>
                    <h1>Members</h1>
                    <div>
                        <p>President - You</p>
                        <p>Vise - President - Chinmay</p>
                        <p>Chairman - Harsh Sawant</p>
                        <p>Treasurer - Harsh Sawant</p>
                        <p>Web Dev Lead - Harsh Sawant</p>
                        <p>Cloud Lead - Chinmay</p>
                        <p>ML Lead - Kedron</p>
                    </div>
                    <h1>Calendar</h1>

                </div>
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-48">Date</TableHead>
                                <TableHead>Event Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.date}>
                                    <TableCell>{formatDate(event.date)}</TableCell>
                                    <TableCell>{event.eventName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default page;
