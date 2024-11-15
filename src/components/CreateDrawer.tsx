'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrigamiIcon, Plus } from "lucide-react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const CreatePostDrawer = () => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    description: '',
    organization: '',
    owner: ''
  });

  const [loading, setloading] = useState(false)

  const {data: token, status} = useSession()
  console.log(token, status)
  const handleSubmit = async (e: any) => {
    try {

      setFormData({ ...formData, owner: token?.user?.email })
      setloading(true)
      e.preventDefault();
      console.log('Form submitted:', formData);
      const res = await axios.post('/api/addEntry', formData);
      const resUser=await axios.post('/api/updateUser', {email:token?.user?.email, name: formData.name})
      if(resUser.data.success){
        console.log('User updated successfully');
      }
      if (res.data.success ) {
        console.log('Entry added successfully');
        setloading(false)
        alert(res.data.message)
      } else {
        alert(res.data.message)
        setloading(false)
        console.log('Error adding entry');
      }

    } catch (error) {
      alert("Error adding entry")
      setloading(false)
      console.log(error);
    }
  };

  return (
    <Drawer>

      <DrawerTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 font-bold">
          <Plus className="mr-2 h-4 w-4 " />
          <span className='font-extrabold'> Create New</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-slate-900 border-t border-slate-800">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-white">Create New Extry</DrawerTitle>
          </DrawerHeader>

          <div className="p-4 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Post Type Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">
                  Entry Type
                </label>
                <Select
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-slate-200 focus:ring-blue-600">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="event" className="text-slate-200 focus:bg-blue-600 focus:text-white">Event</SelectItem>
                    <SelectItem value="club" className="text-slate-200 focus:bg-blue-600 focus:text-white">Club</SelectItem>
                    <SelectItem value="organization" className="text-slate-200 focus:bg-blue-600 focus:text-white">Organization</SelectItem>
                    <SelectItem value="council" className="text-slate-200 focus:bg-blue-600 focus:text-white">Council</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter name"
                  className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-400 focus-visible:ring-blue-600"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">
                  Organization name
                </label>
                <Input
                  type="text"
                  placeholder="Enter Org name"
                  className="bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-400 focus-visible:ring-blue-600"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">
                  Description
                </label>
                <Textarea
                  placeholder="Enter a short description"
                  className="min-h-[120px] bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-400 focus-visible:ring-blue-600"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </form>
          </div>

          <DrawerFooter className="border-t border-slate-800 bg-slate-900/50">
            <div className="flex gap-3 ">
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
              >
                {!loading ? "Create Entry" : "Creating Entry..."}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1 border-slate-700 text-black hover:bg-slate-800 hover:text-white">
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreatePostDrawer;