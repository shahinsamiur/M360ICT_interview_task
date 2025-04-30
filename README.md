# 🛍️ Product Management App

A beautiful and responsive product management system built with **React**, **TypeScript**, **Redux Toolkit**, **RTK Query**, and **Ant Design**.

This application allows users to **list**, **view details**, **edit**, and **update** products fetched from a public API, with a clean, user-friendly interface.

---

## ✨ Features

- 🛒 Fetch and display products in a stylish Ant Design table.
- 📃 View detailed information about a single product.
- 📝 Edit product details with dynamic review fields.
- 🔄 Update product information using PATCH API request.
- 📚 Category select dropdown fetched from API.
- 🔥 Fully responsive and beautiful UI with Ant Design components.
- 🚀 Built with Redux Toolkit & RTK Query for efficient state and data management.
- 🧹 Clean code structure with proper folder splitting.
- ✅ TypeScript types (no `any`) used throughout for better safety and readability.

---

## 🚀 Technologies Used

- **React** (with Hooks)
- **TypeScript**
- **Redux Toolkit** (RTK) + **RTK Query**
- **Ant Design** (UI library)
- **React Router Dom** (for page navigation)
- **Axios** (optional for advanced custom queries)
- **CSS Modules / Custom Styling**

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/shahinsamiur/M360ICT_interview_task
cd M360ICT_interview_task
 npm install
 npm start
```




### 📁 Project Folder Structure

```bash
my-app/
├── public/                 # Static files
│   ├── index.html          # Main HTML file
│   └── favicon.ico         # App icon
│
├── src/                    # Source files
│   ├── API/             # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── css/             # Route-level components
│   ├── pages/           # API calls
│   ├── reduxSlices/ 
│   ├── App.tsx   # Custom React hooks
├── .gitignore              # Git ignore rules
├── package.json            # Project metadata and scripts
├── README.md               # Project documentation
└── tailwind.config.js      # Tailwind CSS config (if used)
```
           




| Method     | Endpoint | Purpose    |
|----------|:---:|-----------:|
| GET   | /products?limit=xx&skip=yy  | Fetch paginated products |
| GET    | /products/:id  | Fetch single product details        |
| PATCH      | /products/:id  | Update product         |
| GET      | /products/categories | Fetch all product categories        |