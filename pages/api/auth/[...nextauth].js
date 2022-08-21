import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
 
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialProvider({
        name: "credentials",
        credentials: {
          username: {label: "Email", type: "email"},
          password: {label: "Password", type: "password"}
        },
        authorize: (credentials) => {
          // database lookup
          
          if(
            credentials.username == "Heidi@gmail.com" &&
            credentials.password == "1234"
          ){
            console.log("Authed")
            return {
              message: "Success"
            }
          }else{
            console.log("Unauthed")
            return {
              message: "Incorrect credentials"
            }
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