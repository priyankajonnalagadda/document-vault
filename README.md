# 📄 Document Vault API

A backend application built using GraphQL, Prisma, PostgreSQL, and Bun to manage documents efficiently with advanced features like search, pagination, and document movement between collections.

---

## 🚀 Tech Stack

- Bun – Runtime  
- Hono – Web Framework  
- GraphQL Yoga – API Layer  
- Prisma ORM – Database Toolkit  
- PostgreSQL – Database  

---

## ✨ Features

- ➕ Create Document  
- 📄 Read Documents (with Pagination)  
- ✏️ Update Document  
- ❌ Delete Document  
- 🔍 Search Documents (by title & content)  
- 🔁 Move Document between Collections  
- ⚡ Fast GraphQL API  
- 🛡️ Input Validation  

---

## 📂 Project Structure

```
document-vault/
│── prisma/
│   └── schema.prisma
│
│── index.ts
│── .env
│── package.json
│── README.md
```

---

## ⚙️ Setup Instructions

```bash
# Install dependencies
bun install

# Run server
bun run index.ts
```

---

## 🌐 API Endpoint

http://localhost:4000/graphql

---

## 🧪 Example Queries

### 📄 Get Documents (Pagination)
```graphql
query {
  documents(skip: 0, take: 5) {
    id
    title
  }
}
```

### 🔍 Search Documents
```graphql
query {
  searchDocuments(query: "doc") {
    id
    title
  }
}
```

### ➕ Create Document
```graphql
mutation {
  createDocument(
    title: "Sample"
    content: "Hello"
    collectionId: 1
  ) {
    id
  }
}
```

### ✏️ Update Document
```graphql
mutation {
  updateDocument(
    id: 1
    title: "Updated Title"
  ) {
    id
    title
  }
}
```

### ❌ Delete Document
```graphql
mutation {
  deleteDocument(id: 1)
}
```

### 🔁 Move Document
```graphql
mutation {
  moveDocument(id: 1, collectionId: 2) {
    id
    collectionId
  }
}
```

---

## 🎯 Learning Outcomes

- Built a complete GraphQL API from scratch  
- Integrated Prisma with PostgreSQL  
- Implemented search and pagination  
- Designed a scalable backend architecture  

---

## 👩‍💻 Author

Priyanka Jonnalagadda
