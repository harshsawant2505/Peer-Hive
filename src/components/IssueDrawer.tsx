'use client';
import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, Plus } from 'lucide-react';
import axios from 'axios';
import { set } from 'mongoose';

const IssueDrawer = ({ organiser }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newIssue, setNewIssue] = useState('');
  const [issues, setIssues] = useState<[string, number][]>([]);
  const [questions, setquestions] = useState<[string, number][]>([]);
  const [satisfied, setsatisfied] = useState<[string, number][]>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/messages?userId=${organiser}`);
      const contents = res.data.map((item: any) => item.content);

      const data = await axios.post('http://127.0.0.1:5000/analyze', {
        data: contents,
      });
      const issuesTemp = data.data.data 

      setIssues(issuesTemp.issues);
      console.log(issuesTemp.issues);
      console.log(issuesTemp.questions);
      setquestions(issuesTemp.questions);
      setsatisfied(issuesTemp.satisfied);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddIssue = () => {
    if (!newIssue.trim()) return;

    setIssues((prev) => {
      const existingIssue = prev.find(([issue]) => issue === newIssue);
      if (existingIssue) {
        return prev.map(([issue, count]) =>
          issue === newIssue ? [issue, count + 1] : [issue, count]
        );
      } else {
        return [...prev, [newIssue, 1]];
      }
    });
    setNewIssue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddIssue();
    }
  };

  const totalIssues = issues.reduce((sum, [, count]) => sum + count, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="default" className="flex gap-2 items-center">
          <AlertCircle className="w-4 h-4" />
          Issues
          <Badge variant="secondary" className="ml-1">
            {totalIssues}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] bg-black">
        <SheetHeader>
          <SheetTitle className="text-white">Issue Tracker</SheetTitle>
        </SheetHeader>

        <div className="mt-6 ">
          {/* Issues List */}
          <div className="space-y-2  h-fit">
            <label className="text-sm text-muted-foreground">
              Current Issues
            </label>
            <ScrollArea className="h-[150px] pr-4">
              <div className="space-y-2">
                {issues.map(([issue, count]) => (
                  <Card key={issue} className="bg-muted">
                    <CardContent className="p-3 flex justify-between items-center">
                      <span className="font-medium">{issue}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Current Questions
            </label>
            <ScrollArea className="h-[150px] pr-4">
              <div className="space-y-2">
                {questions.map(([issue, count]) => (
                  <Card key={issue} className="bg-muted">
                    <CardContent className="p-3 flex justify-between items-center">
                      <span className="font-medium">{issue}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Current Satisfactions
            </label>
            <ScrollArea className="h-[150px] pr-4">
              <div className="space-y-2">
                {satisfied.map(([issue, count]) => (
                  <Card key={issue} className="bg-muted">
                    <CardContent className="p-3 flex justify-between items-center">
                      <span className="font-medium">{issue}</span>
                      <Badge variant="secondary">{count}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Add New Issue Form */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">New Issue</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={newIssue}
                onChange={(e) => setNewIssue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter issue type"
                className="flex-1 text-white"
              />
              <Button
                onClick={handleAddIssue}
                disabled={!newIssue.trim()}
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default IssueDrawer;
