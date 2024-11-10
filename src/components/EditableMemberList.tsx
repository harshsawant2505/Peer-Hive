import React, { useState } from 'react';
import { Users, Edit2, Check, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const EditableMemberList = ({ initialMembers }) => {
  const [members, setMembers] = useState(initialMembers);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEditStart = (member) => {
    setEditingId(member.id);
    setEditValue(member.name);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleEditSave = (id) => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, name: editValue } : member
    ));
    setEditingId(null);
    setEditValue('');
  };

  return (
    <Card className="bg-slate-800/50 border-none text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users size={20} /> Team Members
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-3 border border-blue-500/20"
            >
              <div className="text-gray-300 text-sm">{member.role}</div>
              <div className="flex items-center justify-between">
                {editingId === member.id ? (
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="bg-blue-500/20 text-white rounded px-2 py-1 flex-1"
                    />
                    <button
                      onClick={() => handleEditSave(member.id)}
                      className="text-green-400 hover:text-green-300"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="font-semibold">{member.name}</div>
                    <button
                      onClick={() => handleEditStart(member)}
                      className="text-gray-400 hover:text-white transition"
                    >
                      <Edit2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableMemberList;