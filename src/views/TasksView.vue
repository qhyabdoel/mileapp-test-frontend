<template>
  <div class="overflow-x-auto bg-white shadow rounded">
    <h1>Tasks</h1>
    <table class="w-full text-left border-collapse text-sm sm:text-base">
      <thead>
        <tr>
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Title</th>
          <th class="border px-4 py-2">Description</th>
          <th class="border px-4 py-2">Status</th>
          <th class="border px-4 py-2">Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td class="border px-4 py-2">{{ task.id }}</td>
          <td class="border px-4 py-2">{{ task.title }}</td>
          <td class="border px-4 py-2">{{ task.description }}</td>
          <td class="border px-4 py-2">{{ task.status }}</td>
          <td class="border px-4 py-2">{{ task.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tasks = ref([
  {
    id: 1,
    title: 'Learn App',
    description: 'Learn how to build an app',
    status: 'in-progress',
    createdAt: '2025-10-04',
  },
  {
    id: 2,
    title: 'Build App',
    description: 'Build the app you learned about',
    status: 'pending',
    createdAt: '2025-10-05',
  },
  {
    id: 3,
    title: 'Test App',
    description: 'Test the app you built',
    status: 'done',
    createdAt: '2025-10-06',
  },
])
</script>
