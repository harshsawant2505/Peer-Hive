
import { connectDB } from '@/config/dbConfig';
import Message from '@/models/message.models';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request, res) {
  await connectDB();
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const user = searchParams.get("userId"); 
  console.log(user)
  
    try {
      const messages = await Message.find({ userId: user  })
        .sort({ timestamp: 1 })
        .limit(100);
     return NextResponse.json(messages, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
 
}


export async function POST(req: NextRequest) {

    const {userId, content} = await req.json()

    try {
        const newMessage = new Message({
           userId: userId,
           content: content
           
        });
        const message = await newMessage.save();
        console.log(message);
       return NextResponse.json(message, { status: 201 });
      } catch (error) {
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
      }

}