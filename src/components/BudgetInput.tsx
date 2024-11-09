import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const BudgetInput = () => {
  const [isBudgetSet, setIsBudgetSet] = useState(false);
  const [budget, setBudget] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [tempBudget, setTempBudget] = useState<number>(0);

  const handleSubmit = async () => {
    if (!tempBudget || isNaN(Number(tempBudget))) return;
    
    try {
      await axios.post('/api/budget', { budget: (tempBudget) });
      
      setBudget(Number(tempBudget));
      setIsBudgetSet(true);
      setIsOpen(false);
      setTempBudget(0);
    } catch (error) {
      console.error('Failed to update budget:', error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="flex-1 lg:flex-none bg-emerald-600 hover:bg-emerald-700 transition px-4 py-2 rounded-lg text-sm">
          {isBudgetSet ? `Budget: ₹${budget}` : 'Set Budget'}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-slate-900 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Set Budget</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
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
            onClick={handleSubmit}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md transition"
          >
            Save Budget
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BudgetInput;