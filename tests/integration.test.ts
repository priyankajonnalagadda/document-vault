import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { createYoga, createSchema } from "graphql-yoga";
import { readFileSync } from "fs";
import { resolvers } from "../src/resolvers";

let server: any;

beforeAll(() => {
  const typeDefs = readFileSync("./schema.graphql", "utf-8");

  const yoga = createYoga({
    schema: createSchema({
      typeDefs,
      resolvers,
    }),
  });

  server = Bun.serve({
    port: 4000,
    fetch: yoga.fetch,
  });
});

afterAll(() => {
  if (server) server.stop();
});

describe("Integration Test", () => {
  it("should fetch collections", async () => {
    const res = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            collections {
              id
              name
            }
          }
        `,
      }),
    });

    const data = await res.json();
    expect(data.data).toBeDefined();
  });
});