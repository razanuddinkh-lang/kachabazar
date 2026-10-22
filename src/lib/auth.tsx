
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_URL;
const authSecret = process.env.BETTER_AUTH_SECRET;

if (!mongoUrl) {
  throw new Error("MONGODB_URL is missing from .env");
}

if (!authSecret || authSecret.length < 32) {
  throw new Error("BETTER_AUTH_SECRET must be at least 32 characters");
}

const client = new MongoClient(mongoUrl);
const db = client.db("razan_auth-1");

export const auth = betterAuth({
  appName: "BazaarDor",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: authSecret,

  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
  },

  
socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  },
},

});
