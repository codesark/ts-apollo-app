import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { readFileSync } from "fs";
import http from "http";
import config from "./config";
import { connectDB, db } from "./database";
import resolvers from "./resolvers"

const typeDefs = readFileSync("./src/schema.graphql", { encoding: "utf-8" });

interface MyContext {
  token?: String;
}

(async () => {
  // Connect to Database
  // if (!(await connectDB(db))) {
  //   console.error("Connection to PostgreSQL DB failed... Shutting Down");
  //   process.exit();
  // } else console.log("Connection to PostgreSQL successful");

  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);
  // Here, MyContext is custom context... Defined to prvide type completions
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  // Ensure we wait for our server to start
  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    "/",
    cors<cors.CorsRequest>(),
    // 50mb is the limit that `startStandaloneServer` uses
    bodyParser.json({ limit: "50mb" }),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ host: config.HOST, port: config.PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://${config.HOST}:${config.PORT}/`);
})();
