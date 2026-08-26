export const resolvers = {
  Query: {
    collections: async (_: any, __: any, { prisma }: any) => {
      return prisma.collection.findMany();
    },
  },
  Mutation: {
    createCollection: async (_: any, { name, slug }: any, { prisma }: any) => {
      if (!name.trim()) throw new Error("Name required");
      const slugRegex = /^[a-z0-9-]+$/;
      if (!slugRegex.test(slug)) throw new Error("Invalid slug");
      return prisma.collection.create({ data: { name, slug } });
    },
  },
};
