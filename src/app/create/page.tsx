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
import { Plus } from "lucide-react";

const CreatePostDrawer = () => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    description: ''
  });

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-slate-900 border-t border-slate-800">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-white">Create New Post</DrawerTitle>
          </DrawerHeader>
          
          <div className="p-4 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Post Type Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">
                  Post Type
                </label>
                <Select 
                  onValueChange={(value) => setFormData({...formData, type: value})}
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
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
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
                Create Post
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="flex-1 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white">
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