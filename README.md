## Overview

The app allows users to:

- **Login / Logout**
- **View tasks** with pagination, sorting, and filtering
- **Create / Update / Delete tasks** via responsive modals
- **Confirm deletions** with a custom modal
- **View responsive layouts** that adapt from desktop to mobile

The mock API supports query parameters such as:

```json
{
  "page": 1,
  "limit": 5,
  "sort": "createdAt",
  "order": "desc",
  "status": "pending"
}
```

## Tech Stack

### **Frontend**

- **Vue 3** with `<script setup>` syntax
- **TypeScript** for strong typing
- **Tailwind CSS** for responsive UI
- **Axios** for API requests
- **Vite** as the build tool

### **Backend (Mock API)**

- **Express.js**
- **PostgreSQL** (mocked or simulated dataset)
- **pg** library for database connection
- **CORS**, **dotenv**, **UUID** for supporting modules

---

## Design Decisions

1. **Component-based architecture**  
   Each major feature (`TasksView`, `LoginView`) is separated into its own view for scalability and maintainability.

2. **Modal-based CRUD**  
   Instead of navigating to separate create/update pages, modals were used to keep user context within the task list view.  
   This improves UX and reduces unnecessary route transitions.

3. **Responsive-first design**  
   Tailwind’s `flex-col sm:flex-row`, `w-full sm:w-auto`, and `gap` utilities were used extensively to ensure consistent layout across devices.

4. **Strong typing for queries and tasks**  
   `Task` and `TaskQuery` interfaces ensure data consistency across the frontend and backend.

5. **Declarative API layer**  
   A clean `api/tasks.ts` module abstracts Axios calls, keeping API logic separate from UI logic.

6. **Loading & saving guards**  
   Added `isLoading` and `isSaving` states to prevent multiple submissions and race conditions.

7. **Custom confirmation modals**  
   Instead of browser alerts, modals provide better styling and control (consistent with app theme).

---

## Module Strengths

- **Reusability**  
  Core CRUD logic is reusable for future modules (e.g., Projects, Notes).

- **Scalability**  
  Adding filters or extra columns requires minimal changes thanks to the `TaskQuery` interface and reactive Vue refs.

- **Clarity**  
  The separation between presentation (`TasksView.vue`) and API logic (`api/tasks.ts`) makes maintenance straightforward.

- **Responsiveness**  
  The entire layout automatically adapts to mobile without extra CSS media queries — all handled by Tailwind utilities.
