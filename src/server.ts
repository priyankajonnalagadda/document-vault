import { createServer } from "http";
import { createYoga } from "graphql-yoga";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers";
import { createContext } from "./context";

const typeDefs = readFileSync("./schema.graphql", "utf-8");

const yoga = createYoga({
  schema: { typeDefs, resolvers },
  context: createContext,
});

createServer(yoga).listen(4000, () => {
  console.log("http://localhost:4000/graphql");
});
