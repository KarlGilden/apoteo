import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { connectToDatabase } from "../../../util/db";


export default NextAuth({
  // Configure one or more authentication providers
  site: process.env.NEXTAUTH_URL,
  providers: [
    CredentialProvider({
        name: "credentials",
        credentials: {
          username: {label: "Email", type: "email"},
          password: {label: "Password", type: "password"}
        },
        authorize: async (credentials) => {
          let { db } = await connectToDatabase();
          const users = db.collection("Users")

          const query = { email: credentials.username };
          const user = await users.findOne()

          if(!user){
            console.log("Not found")
            return null
          }

          const validPassword = await bcrypt.compare(credentials.password, user.password);

          if(
            credentials.username == user.email &&
            validPassword
          ){
            console.log("Authed")
            return {
              email: user.email,
              name: user.name
            }
          }else{
            console.log("Unauthed")
            return null
          }
        }
      })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    session: ({ session, token }) => {
      if(token){
        session.id = token.id
      }
      return session
    }
  }

})