# 📄 Document Vault API

A GraphQL-based Document Vault API built using **Bun, GraphQL Yoga, and Hono-style server setup**. This project allows users to create, read, update, and delete documents efficiently. Designed as a modern backend project to demonstrate API development skills.

---

## 🚀 Features

- Create documents
- Fetch all documents
- Update document details
- Delete documents
- GraphQL API with interactive UI
- Fast runtime using Bun

---

## 🛠️ Tech Stack

- Bun (Runtime)
- GraphQL Yoga
- TypeScript

---

## 📂 Project Structure

```
document-vault/
│── index.ts
│── schema.graphql
│── package.json
│── tsconfig.json
│── README.md
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/priyankajonnalagadda/document-vault.git
cd document-vault
```

Install dependencies:

```bash
bun install
```

---

## ▶️ Run the Server

```bash
bun run index.ts
```

Server will start at:

```
http://localhost:4000/graphql
```

---

## 🧪 Testing (GraphQL Playground)

Open in browser:

```
http://localhost:4000/graphql
```

---

## 📌 Example Queries

### 🔍 Get All Documents

```graphql
query {
  documents {
    id
    title
    content
  }
}
```

---

### ➕ Create Document

```graphql
mutation {
  createDocument(
    title: "New Doc"
    content: "Sample content"
    collectionId: 1
  ) {
    id
    title
  }
}
```

---

### ✏️ Update Document

```graphql
mutation {
  updateDocument(
    id: 1
    title: "Updated Title"
    content: "Updated content"
  ) {
    id
    title
  }
}
```

---

### ❌ Delete Document

```graphql
mutation {
  deleteDocument(id: 1)
}
```

---

## 📈 Future Improvements

- Connect with PostgreSQL using Prisma
- Add authentication (JWT)
- Implement search & pagination
- Organize into modular folder structure
- Deploy to cloud (Render / Railway / Vercel)

---

## 🌐 Live Repository

👉 https://github.com/priyankajonnalagadda/document-vault

---

## 👩‍💻 Author

**Priyanka Jonnalagadda**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
