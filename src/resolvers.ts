import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    collections: async () => {
      return prisma.collection.findMany();
    },

    collection: async (_: any, { id }: { id: number }) => {
      return prisma.collection.findUnique({
        where: { id },
        include: { documents: true },
      });
    },

    documents: async (_: any, args: any) => {
      const { collectionId, search, isArchived, take = 10, cursor } = args;

      return prisma.document.findMany({
        where: {
          collectionId: collectionId || undefined,
          isArchived: isArchived ?? undefined,
          OR: search
            ? [
                { title: { contains: search, mode: "insensitive" } },
                { content: { contains: search, mode: "insensitive" } },
              ]
            : undefined,
        },
        take,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });
    },
  },

  Mutation: {
    createCollection: async (_: any, { name, slug }: any) => {
      if (!name || !slug) throw new Error("Invalid input");

      return prisma.collection.create({
        data: { name, slug },
      });
    },

    createDocument: async (_: any, { title, content, collectionId }: any) => {
      if (!title || !content) throw new Error("Invalid input");

      return prisma.document.create({
        data: {
          title,
          content,
          collectionId,
        },
      });
    },

    updateDocument: async (_: any, { id, title, content }: any) => {
      return prisma.document.update({
        where: { id },
        data: { title, content },
      });
    },

    deleteDocument: async (_: any, { id }: any) => {
      return prisma.document.delete({
        where: { id },
      });
    },

    moveDocument: async (_: any, { id, collectionId }: any) => {
      return prisma.document.update({
        where: { id },
        data: { collectionId },
      });
    },
  },

  Collection: {
    documents: (parent: any) => {
      return prisma.document.findMany({
        where: { collectionId: parent.id },
      });
    },
  },
};