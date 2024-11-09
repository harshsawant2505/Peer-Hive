import NextAuth, { NextAuthOptions, User as NextAuthUser, Account, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/config/dbConfig";
import User from "@/models/user.models";
import { cookies } from 'next/headers';

const authOption: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
  
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
               
            },
        }),
    ],
    
    callbacks: {
        async signIn({ user, account, profile }: { user: NextAuthUser, account: Account | null, profile?: any }) {

            console.log("entered herer in route")
            await connectDB();
          
            
            if (!profile?.email) {
                throw new Error("No profile");
            }

            
                const savedUser = await User.findOne({ email: profile.email});
                if (!savedUser) {
                    
                   
                        const newUser = new User({
                            name: profile.name,
                            email: profile.email,
                            profilePic:profile.picture,
                           
                        });
                        const savedUser = await newUser.save();
                        console.log(profile);
                        return true;
                    
                }
                await User.findOneAndUpdate({ email: profile.email }, 
                    { $set: {
                    name: profile.name,
                    
                  } }
                  , { new: true });

                console.log(profile)
                return true;
         
        },
        
        async jwt({ token, user, account }:any) {
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
    },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
