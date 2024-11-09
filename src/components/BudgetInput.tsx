'use client'
import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import axios from 'axios';

const BudgetInput = ({isBudgetSet,budget,setBudget, setisBudgetSet}:any) => {



  const [isOpen, setIsOpen] = useState(false);
  const [spendAmount, setSpendAmount] = useState('');
  const [description, setDescription] = useState('');
  
  const [tempBudget, setTempBudget] = useState('');
  console.log(isBudgetSet,budget);  

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/getUser`);
      if (response.ok) {
        const temp = await response.json();
        setBudget(temp.user.budget);
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSetBudget = async () => {
    if (!tempBudget || isNaN(Number(tempBudget))) return;

    
    
    try {
      const response= await axios.post('/api/budget', {
        budget: Number(tempBudget)
      });
      console.log(response.data);
      
      
      if (response.data.success) {
        setBudget(Number(tempBudget));
        setisBudgetSet(true);
        setIsOpen(false);
        setTempBudget('');
      }
    } catch (error) {
      console.log('Failed to update budget:', error);
    }
  };

  const handleSpend = async () => {
    if (!spendAmount || isNaN(Number(spendAmount)) || Number(spendAmount) > budget) return;
    
    try {
      const response = await axios.post('/api/updateBudget', {
        amount: Number(spendAmount),
        description,
        remainingBudget: budget - Number(spendAmount)
      });

      
      
      if (response.data.success) {
        setBudget(response.data.remainingBudget);
        setIsOpen(false);
        setSpendAmount('');
        setDescription('');
      }
    } catch (error) {
      console.log('Failed to spend budget:', error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="flex-1 lg:flex-none bg-emerald-600 hover:bg-emerald-700 transition px-4 py-2 rounded-lg text-sm">
          {budget>0 ? `Budget: ₹${budget}` : 'Set Budget'}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-slate-900 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">
            {budget>0 ? 'Spend Budget' : 'Set Budget'}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {budget<=0 ? (
            // Set Budget Form
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Enter Budget Amount (₹)</label>
                <input
                  type="number"
                  value={tempBudget}
                  onChange={(e) => setTempBudget(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={handleSetBudget}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md transition"
              >
                Set Budget
              </button>
            </div>
          ) : (
            // Spend Budget Form
            <div className="space-y-4">
              <div className="text-sm text-gray-300 mb-4">
                Available Budget: ₹{budget}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Amount to Spend (₹)</label>
                <input
                  type="number"
                  value={spendAmount}
                  onChange={(e) => setSpendAmount(e.target.value)}
                  max={budget}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white"
                  placeholder="Enter amount to spend"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white"
                  placeholder="What is this expense for?"
                />
              </div>
              <button
                onClick={handleSpend}
                disabled={!spendAmount || Number(spendAmount) > budget}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-md transition"
              >
                Spend
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BudgetInput;