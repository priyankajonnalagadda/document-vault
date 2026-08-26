import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { createYoga, createSchema } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = new Hono();

//
// ✅ GraphQL Schema
//
const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Document {
      id: Int!
      title: String!
      content: String!
      collectionId: Int!
    }

    type Query {
      # 📄 Pagination
      documents(skip: Int, take: Int): [Document]

      # 🔍 Search
      searchDocuments(query: String!): [Document]
    }

    type Mutation {
      # ➕ Create
      createDocument(
        title: String!
        content: String!
        collectionId: Int!
      ): Document

      # ✏️ Update
      updateDocument(
        id: Int!
        title: String
        content: String
      ): Document

      # ❌ Delete
      deleteDocument(id: Int!): Boolean

      # 🔁 Move Document
      moveDocument(id: Int!, collectionId: Int!): Document
    }
  `,

  resolvers: {
    Query: {
      // 📄 Pagination
      documents: async (_: any, args: any) => {
        return await prisma.document.findMany({
          skip: args.skip ?? 0,
          take: args.take ?? 5,
        });
      },

      // 🔍 Search
      searchDocuments: async (_: any, args: any) => {
        return await prisma.document.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: args.query,
                  mode: "insensitive",
                },
              },
              {
                content: {
                  contains: args.query,
                  mode: "insensitive",
                },
              },
            ],
          },
        });
      },
    },

    Mutation: {
      // ➕ Create
      createDocument: async (_: any, args: any) => {
        if (!args.title || !args.content) {
          throw new Error("Title and content required");
        }

        return await prisma.document.create({
          data: {
            title: args.title,
            content: args.content,
            collectionId: args.collectionId,
          },
        });
      },

      // ✏️ Update
      updateDocument: async (_: any, args: any) => {
        return await prisma.document.update({
          where: { id: args.id },
          data: {
            title: args.title ?? undefined,
            content: args.content ?? undefined,
          },
        });
      },

      // ❌ Delete
      deleteDocument: async (_: any, args: any) => {
        await prisma.document.delete({
          where: { id: args.id },
        });
        return true;
      },

      // 🔁 Move Document
      moveDocument: async (_: any, args: any) => {
        return await prisma.document.update({
          where: { id: args.id },
          data: {
            collectionId: args.collectionId,
          },
        });
      },
    },
  },
});

//
// ✅ GraphQL Server
//
const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql",
});

//
// ✅ Route
//
app.use("/graphql", (c) => {
  return yoga.handleRequest(c.req.raw);
});

//
// 🚀 Start Server
//
serve({
  fetch: app.fetch,
  port: 4000,
});

console.log("🚀 Server running at http://localhost:4000/graphql");