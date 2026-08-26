import { describe, it, expect } from "bun:test";
import { resolvers } from "../src/resolvers";

describe("Resolvers Unit Tests", () => {
  it("should create a collection", async () => {
    const result = await resolvers.Mutation.createCollection(null, {
      name: "Test",
      slug: "test",
    });

    expect(result.name).toBe("Test");
  });

  it("should create a document", async () => {
    const col = await resolvers.Mutation.createCollection(null, {
      name: "Col",
      slug: "col",
    });

    const doc = await resolvers.Mutation.createDocument(null, {
      title: "Doc",
      content: "Content",
      collectionId: col.id,
    });

    expect(doc.title).toBe("Doc");
  });

  it("should fetch collections", async () => {
    const data = await resolvers.Query.collections();
    expect(Array.isArray(data)).toBe(true);
  });

  it("should update document", async () => {
    const col = await resolvers.Mutation.createCollection(null, {
      name: "Col2",
      slug: "col2",
    });

    const doc = await resolvers.Mutation.createDocument(null, {
      title: "Old",
      content: "Test",
      collectionId: col.id,
    });

    const updated = await resolvers.Mutation.updateDocument(null, {
      id: doc.id,
      title: "New",
    });

    expect(updated.title).toBe("New");
  });

  it("should move document", async () => {
    const c1 = await resolvers.Mutation.createCollection(null, {
      name: "C1",
      slug: "c1",
    });

    const c2 = await resolvers.Mutation.createCollection(null, {
      name: "C2",
      slug: "c2",
    });

    const doc = await resolvers.Mutation.createDocument(null, {
      title: "Doc",
      content: "Test",
      collectionId: c1.id,
    });

    const moved = await resolvers.Mutation.moveDocument(null, {
      id: doc.id,
      collectionId: c2.id,
    });

    expect(moved.collectionId).toBe(c2.id);
  });

  it("should delete document", async () => {
    const col = await resolvers.Mutation.createCollection(null, {
      name: "Col3",
      slug: "col3",
    });

    const doc = await resolvers.Mutation.createDocument(null, {
      title: "Delete",
      content: "Test",
      collectionId: col.id,
    });

    const deleted = await resolvers.Mutation.deleteDocument(null, {
      id: doc.id,
    });

    expect(deleted.id).toBe(doc.id);
  });

  it("should paginate documents", async () => {
    const docs = await resolvers.Query.documents(null, { take: 2 });

    expect(Array.isArray(docs)).toBe(true);
  });
});