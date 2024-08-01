import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";

import User from "@models/user";

// console.log({
//     clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// })

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  async session({ session }) {},

  async signIn({ profile }) {
    // every nextjs route is a serverless route.
    try {
      await connectToDB();

      // check if a user already exist

      const userExists = await User.findOne({
        email: profile.email
      })



      // if not, create a user

      if(!userExists) {
        await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowercase(),
            image: profile.image
        })
      }


      return true;
    } catch (error) {
        console.log(error);
        return false;
    }
  },
});

export { handler as GET, handler as POST };
